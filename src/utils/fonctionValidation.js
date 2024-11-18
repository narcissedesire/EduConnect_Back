// Fonction générique de validation
export const validateData = (data, schema) => {
  const validation = schema.safeParse(data);
  if (!validation.success) {
    const errors = validation.error.errors.map((err) => err.message).join(", ");
    throw new Error(errors);
  }
  return validation.data;
};
