import { executeQuery } from '../config/db.config.js';
import { verify_exists_category } from '../queries/categorias/GET/index.js';

export async function verifyExistsCategory(params) {
  const result = await executeQuery(verify_exists_category, params);
  if (result.length > 0) {
    return true;
  }
  return false;
}
