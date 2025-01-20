export const get_preferencias = `
SELECT *
FROM 
  tb_preferences prf
WHERE prf.usr_id = ? 
`