"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { db } from "@/db";

export async function editSnippet(id: number, code: string) {
  await db.snippets.update({ where: { id }, data: { code } });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippets.delete({ where: { id } });

  revalidatePath("/");
  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.trim().length < 3) {
      return { message: "Title must be longer" };
    }

    if (typeof code !== "string" || code.trim().length < 10) {
      return { message: "Code must be longer" };
    }

    await db.snippets.create({ data: { code, title } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "Something is wrong..." };
    }
  }

  revalidatePath("/");
  redirect("/");
}
