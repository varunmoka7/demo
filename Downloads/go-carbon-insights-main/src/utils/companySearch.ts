
import { supabase } from '@/integrations/supabase/client';

/**
 * Search companies by name or industry
 */
export async function searchCompanies(searchTerm: string, filters: any = {}) {
  try {
    let query = supabase
      .from('companies')
      .select('*');

    // Apply search term
    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,industry.ilike.%${searchTerm}%`);
    }

    // Apply filters
    if (filters.industry) {
      query = query.eq('industry', filters.industry);
    }

    const { data, error } = await query.order('name');

    if (error) throw error;

    return {
      companies: data,
      success: true
    };
  } catch (error) {
    console.error('Error searching companies:', error);
    return { success: false, error };
  }
}
