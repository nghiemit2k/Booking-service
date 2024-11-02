-- CreateTable
CREATE TABLE "external_session" (
    "id" SERIAL NOT NULL,
    "calendar_type" TEXT NOT NULL,
    "session_id" INTEGER NOT NULL,

    CONSTRAINT "external_session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "external_session" ADD CONSTRAINT "external_session_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
