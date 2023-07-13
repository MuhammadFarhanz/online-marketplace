import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ctx}) => {
    return ctx.prisma.product.findMany({
      include: {
        image: true
      }
    });
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
  .input(z.object({ name: z.string(), description: z.string(), price: z.string(), image: z.array(z.string()), condition: z.string(),location: z.string(), category: z.string(),}))
  .mutation( async ({input, ctx}) => {
    const images = input.image.map((imageUrl) => ({ url: imageUrl }));
    const product = await ctx.prisma.product.create({
     data: {
       name: input.name,
       price: input.price,
       description: input.description,
       image: {
        create: images,
      },
       condition: input.condition,
       location: input.location,
       category: input.category,
       authorId: ctx.session.user.id,
      
     }
    })   
   
    return product; 
  })
});
