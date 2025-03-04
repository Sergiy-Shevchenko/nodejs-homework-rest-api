import Joi from "joi";

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactsSchemas = {
  addContactSchema,
  contactUpdateFavoriteSchema,
};


export default contactsSchemas;
