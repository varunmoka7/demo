
import { secureAddEmissionEntry } from './secureDataOperations';

/**
 * Enhanced secure emission entry function (replaces the old one)
 */
export async function addEmissionEntry(entryData: {
  company_id: string;
  date: string;
  category: string;
  amount: number;
  unit: string;
  description?: string;
}) {
  console.log('Using enhanced secure emission tracking...');
  return await secureAddEmissionEntry(entryData);
}
