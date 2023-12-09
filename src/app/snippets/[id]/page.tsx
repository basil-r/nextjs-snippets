import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/db";
import * as actions from "@/actions";

interface SnippetShowpageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowpageProps) {
  // simulate delay
  await new Promise((r) => setTimeout(r, 2000));

  const snippet = await db.snippets.findFirst({
    where: { id: Number.parseInt(props.params.id) },
  });

  if (!snippet) return notFound();

  const deleteSnippetActions = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetActions}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

// caching dynamic routes
export async function generateStaticParams() {
  const snippets = await db.snippets.findMany();
  return snippets.map((snippet) => ({ id: snippet.id }));
}
