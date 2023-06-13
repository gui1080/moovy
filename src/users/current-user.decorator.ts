import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// get the current authenticated user
export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user ?? null;
    }
);