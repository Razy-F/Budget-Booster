import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/lib/zod/schema/categories";
export async function CreateCategory(form: CreateCategorySchemaType) {
  const parsedBody = CreateCategorySchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error("bad request");
  }
}
