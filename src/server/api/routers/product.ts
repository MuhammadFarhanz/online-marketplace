import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ctx}) => {
    return ctx.prisma.product.findMany();
  }),
  getProductById: protectedProcedure
    .input(z.object({ productId: z.string()}))
    .query(({ctx, input}) => {
      return ctx.prisma.product.findUnique({
        where:{
          id: input.productId
        }
      })
    })
  ,
  create: protectedProcedure
  .input(z.object({ name: z.string(), description: z.string(), price: z.number()}))
  .mutation( async ({input, ctx}) => {
    console.log(input,ctx.session.user)
    const product = await ctx.prisma.product.create({
     data: {
       name: input.name,
       price: input.price,
       description: input.description,
       authorId: ctx.session.user.id
     }
    })   
    return product; 
  })
});
