import { Module, Global } from "@nestjs/common";
import { PostmarkService } from "./postmark.service";
@Global()
@Module({
    providers: [PostmarkService],
    exports: [PostmarkService]
})
export class PostmarkModule { }
