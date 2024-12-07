
import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hogan = require('hogan.js');

@Injectable()
export class JobConsumer {
    async sendEmail() {
        console.log('Sending email...');
        const templatePath = path.join(
            __dirname,
            '../../../../../../templates/session-alert.template.hbs',
        );
        const template = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = hogan.compile(template);
        // TODO: Get data from database
        const html = compiledTemplate.render({
            firstName: 'Coach 123',
            sessionCount: 10,
        });
        const res = await this.postmarkService.sendEmail({ html });
        console.log('🚀 ~ JobConsumer ~ sendEmail ~ res:', res);
    }
}