
import { supabase } from '@/integrations/supabase/client';

export interface SecureOperationResult {
  success: boolean;
  error?: string;
  data?: any;
  requiresAuth?: boolean;
  rateLimited?: boolean;
}

/**
 * Securely add emission entry with proper validation and rate limiting
 */
export async function secureAddEmissionEntry(entryData: {
  company_id: string;
  date: string;
  category: string;
  amount: number;
  unit: string;
  description?: string;
}): Promise<SecureOperationResult> {
  try {
    // Check authentication first
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { 
        success: false, 
        error: 'Authentication required',
        requiresAuth: true 
      };
    }

    console.log('Attempting secure emission entry addition...');

    // Validate company access
    const { data: hasAccess, error: accessError } = await supabase.rpc(
      'user_has_company_access',
      {
        user_uuid: user.id,
        company_text: entryData.company_id
      }
    );

    if (accessError || !hasAccess) {
      return { 
        success: false, 
        error: 'Access denied: You do not have permission to modify this company\'s data' 
      };
    }

    // Check rate limiting
    const { data: rateLimitOk, error: rateLimitError } = await supabase.rpc(
      'check_rate_limit',
      {
        user_uuid: user.id,
        operation_type: 'INSERT'
      }
    );

    if (rateLimitError || !rateLimitOk) {
      return { 
        success: false, 
        error: 'Rate limit exceeded. Please wait before making more changes.',
        rateLimited: true 
      };
    }

    const year = new Date(entryData.date).getFullYear();
    
    // Check if entry for this year exists
    const { data: existingEntry, error: fetchError } = await supabase
      .from('emissions_data')
      .select('*')
      .eq('company_id', entryData.company_id)
      .eq('year', year)
      .maybeSingle();

    if (fetchError) {
      console.error('Error checking existing entry:', fetchError);
      return { success: false, error: 'Database error occurred' };
    }

    if (existingEntry) {
      // Update existing entry
      const updateData: any = {};
      if (entryData.category === 'electricity') {
        updateData.scope2 = existingEntry.scope2 + entryData.amount;
      } else if (entryData.category === 'fuel') {
        updateData.scope1 = existingEntry.scope1 + entryData.amount;
      } else {
        updateData.scope3 = existingEntry.scope3 + entryData.amount;
      }

      const { data, error } = await supabase
        .from('emissions_data')
        .update(updateData)
        .eq('id', existingEntry.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating emission entry:', error);
        return { success: false, error: 'Failed to update emission data' };
      }

      return { success: true, data };
    } else {
      // Create new entry
      const newEntry = {
        company_id: entryData.company_id,
        year: year,
        scope1: entryData.category === 'fuel' ? entryData.amount : 0,
        scope2: entryData.category === 'electricity' ? entryData.amount : 0,
        scope3: !['fuel', 'electricity'].includes(entryData.category) ? entryData.amount : 0
      };

      const { data, error } = await supabase
        .from('emissions_data')
        .insert([newEntry])
        .select()
        .single();

      if (error) {
        console.error('Error creating emission entry:', error);
        return { success: false, error: 'Failed to create emission data' };
      }

      return { success: true, data };
    }
  } catch (error) {
    console.error('Unexpected error in secure operation:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Securely fetch company data with proper access control
 */
export async function secureGetCompanyData(companyId: string): Promise<SecureOperationResult> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // For unauthenticated users, only return public data
      const { data, error } = await supabase
        .from('public_company_data')
        .select('*')
        .eq('id', companyId)
        .maybeSingle();

      if (error) {
        return { success: false, error: 'Failed to fetch public company data' };
      }

      return { success: true, data };
    }

    // For authenticated users, check access
    const { data: hasAccess } = await supabase.rpc(
      'user_has_company_access',
      {
        user_uuid: user.id,
        company_text: companyId
      }
    );

    if (hasAccess) {
      // Return full company data
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', companyId)
        .single();

      if (error) {
        return { success: false, error: 'Failed to fetch company data' };
      }

      return { success: true, data };
    } else {
      // Return only public data
      const { data, error } = await supabase
        .from('public_company_data')
        .select('*')
        .eq('id', companyId)
        .maybeSingle();

      if (error) {
        return { success: false, error: 'Failed to fetch public company data' };
      }

      return { success: true, data };
    }
  } catch (error) {
    console.error('Error in secure company data fetch:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
