import { defineSchema, defineTable } from "convex/server";

export default defineSchema({

    posts: defineTable({
        title: "string",
        content: "string",
    })

})