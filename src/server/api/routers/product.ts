import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAllProduct: publicProcedure.query(({ctx}) => {
    return ctx.prisma.product.findMany();
  }),
  getProductById: protectedProcedure
    .input(z.object({ listingId: z.string()}))
    .query(({ctx, input}) => {
      return ctx.prisma.product.findUnique({
        where:{
          id: input.listingId
        }
      })
    })
  ,
  createProduct: protectedProcedure
  .input(z.object({ name: z.string(), description: z.string(), price: z.number()}))
  .mutation( async ({input, ctx}) => {
    const listing = await ctx.prisma.product.create({
     data: {
        ...input,
        userId : ctx.session.user.id
     }
    })   
    return listing; 
  })
});
