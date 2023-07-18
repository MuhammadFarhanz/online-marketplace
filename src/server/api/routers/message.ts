import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const messageRouter = createTRPCRouter({
  // sendMessage: protectedProcedure
  // .input(z.object({message: z.string(), productId: z.string(),
  //   toUser: z.string()
  // }))
  // .mutation(async ({ctx, input}) => {
  //   console.log(input,'ini input dari trpc')
  //   const message = await ctx.prisma.message.create({
  //     data:{
  //        fromUser: ctx.session.user.id,
  //        fromUserName: ctx.session.user.name ?? "unknown",      
  //        toUser: input.toUser,
  //        message: input.message,
  //        productId: input.productId
  //     }
  //   })
  //   return message;
  // }),
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

      let conversation = await ctx.prisma.conversation.findFirst({
        where: {
          conversationUsers: {
            every: {
              userId: {
                in: [ctx.session.user.id, input.authorId],
              },
            },
          },
        },
      });

  
      if (!conversation) {
        conversation = await ctx.prisma.conversation.create({
          data: {
            conversationUsers: {
              create: [
                { userId: ctx.session.user.id },
                { userId: input.authorId },
              ],
            },
          },
        });
      }

      const message = await ctx.prisma.message.create({
        data: {
          message: input.message,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          conversation: {
            connect: {
              id: conversation?.id,
            },
          },
        },
      });
 
      return message.message; 
    } catch (error:any) {
      throw new Error("Error sending the message: " + error.message);
    }
  }),
  conversations: protectedProcedure
  .query(({ctx}) => {
    return ctx.prisma.conversationUser.findMany({
      where:{
        userId: ctx.session.user.id
      },
           include: {
        conversation: {
          include: {
            conversationUsers: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                    // username: true,
                  },
                },
              },
            },
            lastMessage: true,
          },
        },
      },
      orderBy: {
        conversation: {
          lastMessageId: "desc",
        },
      },

    })
  })
  

});
