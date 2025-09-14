import { client } from "@/lib/client";
import Image from "next/image";
import { useRouter } from "next/router";
import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id
 
  // fetch post information
  const data = await client.get({
    endpoint: `blogs`,
    contentId: id,
  });
 
  return {
    title: data.title,
    description: data.description,
  }
}

export default async function BlogDetailPage({
    params,
}: {
  params: Promise<{ id: string }>
}) {
const { id } = await params

  const data = await client.get({
    endpoint: `blogs`,
    contentId: id,
  });

  return (
    <div className="min-h-screen text-white">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">{data.title}</h1>
            {data.eyecatch && (
              <Image
                src={data.eyecatch.url}
                alt={data.title}
                width={800}
                height={400}
                className="w-full h-auto object-cover mb-4 rounded"
              />
            )}
            <div className="text-gray-400 text-sm mb-4">
              <span>{new Date(data.publishedAt).toISOString().slice(0, 10).replace(/-/g, '/')}</span>
            </div>
            <div className="text-gray-300 mb-4 post" dangerouslySetInnerHTML={{__html: data.content}} />
          </div>
        </div>
      </section>
    </div>
  );
}
