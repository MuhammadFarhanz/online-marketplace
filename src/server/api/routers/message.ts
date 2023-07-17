import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const messageRouter = createTRPCRouter({
  sendMessage: protectedProcedure
  .input(z.object({message: z.string(), productId: z.string(),
    toUser: z.string()
  }))
  .mutation(async ({ctx, input}) => {
    console.log(input,'ini input dari trpc')
    const message = await ctx.prisma.message.create({
      data:{
         fromUser: ctx.session.user.id,
         fromUserName: ctx.session.user.name ?? "unknown",      
         toUser: input.toUser,
         message: input.message,
         productId: input.productId
      }
    })
    return message;
  }),
  sendMessageToUser: protectedProcedure
  .input(z.object({message: z.string(), authorId: z.string()}))
  .mutation(async ({ctx, input}) => {
    try {

      const author = await ctx.prisma.user.findUnique({
        where: {
          id: input.authorId,
        },
      });

      if (!author) {
        throw new Error("Author not found.");
      }
      
      const message = await ctx.prisma.message.create({
        data: {
          fromUser: ctx.session.user.id, 
          fromUserName: ctx.session.user.name ?? "Unknown",
          toUser: input.authorId,
          message: input.message,
        },
      });

      return message.message; 
    } catch (error:any) {
      throw new Error("Error sending the message: " + error.message);
    }
  }),
  // getMessage: protectedProcedure
  // .input(z.object({}))

});
