import createClient from '@sanity/client'
// import { createClient } from 'https://esm.sh/@sanity/client'
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2022-01-12',
    token: process.env.REACT_APP_SANITY_TOKEN


    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)


// uses GROQ to query content: https://www.sanity.io/docs/groq
// export async function getPosts() {
//     const posts = await client.fetch('*[_type == "post"]')
//     return posts
// }

// export async function createPost(post: Post) {
//     const result = client.create(post)
//     return result
// }

// export async function updateDocumentTitle(_id, title) {
//     const result = client.patch(_id).set({ title })
//     return result
// }