import z from "zod";

const PlaylistSchema = z.object({
    name: z.string().min(1, "A playlist deve conter um nome"),
    songs: z.array(z.string()).min(1, "A playlist deve ter pelo menos uma música")
})

export { PlaylistSchema }