import { DynamicModule, Module, Global } from "@nestjs/common";
import { GoogleCalendarService } from "./google-calendar.service";
import { googleCalendarConfig, GOOGLE_CALENDAR_CONFIG } from "./google-calendar.config";
@Global()
@Module({

})
export class GoogleCalendarModule {
    static forRoot(config: googleCalendarConfig): DynamicModule {
        return {
            imports: [],
            module: GoogleCalendarModule,
            providers: [{ provide: GOOGLE_CALENDAR_CONFIG, useValue: config }, GoogleCalendarService],
            exports: [GOOGLE_CALENDAR_CONFIG, GoogleCalendarService]
        }
    }
}