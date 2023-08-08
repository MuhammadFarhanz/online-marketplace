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
        },
        include: {
          image: true,
          author: {
            select: {
                name: true,
                image: true
            }
        }
        }
      })
    })
  ,
  create: protectedProcedure
  .input(z.object({ name: z.string(), description: z.string(), price: z.number(), image: z.array(z.string()), condition: z.string(),location: z.string(), category: z.string(),}))
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
  }),

  getAllProductById: protectedProcedure
  .query(({ctx}) => {
      return ctx.prisma.product.findMany({
        where:{
          authorId: ctx.session.user.id
        },
        select:{
            name:true,
            id: true,
            description: true,
            image:true,
            price:true,
            condition:true,
            category:true,
            location:true
        }
      })
  }),

  update: protectedProcedure
  .input(z.object({id: z.string(), newProductData: z.object({name: z.string(), description: z.string(), price: z.number(), category: z.string(), location: z.string(),image: z.array(z.string(),)})}))
  .mutation( async ({input,ctx}) => {
    await ctx.prisma.image.deleteMany({
      where: { productId: input.id }
    });

    // Create image objects for the new images
    const images = input.newProductData.image.map(imageUrl => ({ url: imageUrl }));

    const product = await ctx.prisma.product.update({
      where:{
        id: input.id,
      },  
      data:{
        name: input.newProductData.name,
        description: input.newProductData.description,
        price: input.newProductData.price,
        category: input.newProductData.category,
        location: input.newProductData.location,
        image: {
          create: images,
        },
      },
      include: {
        image:true
      }
    })
    return product
  }),

  delete: protectedProcedure
  .input(z.object({id: z.string()}))
  .mutation( async ({ ctx , input}) => {
    const product = await ctx.prisma.product.delete({
      where: {
        id: input.id
      }
    })
    return product;
  })


});
