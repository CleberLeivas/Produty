/*
  Warnings:

  - You are about to drop the `Registro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Registro";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "registros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hora_inicio" DATETIME NOT NULL,
    "hora_fim" DATETIME NOT NULL,
    "intervalo" INTEGER NOT NULL,
    "descricao" TEXT,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "idx_hora_inicio_fim" ON "registros"("hora_inicio", "hora_fim");

-- CreateIndex
CREATE INDEX "idx_criado_em" ON "registros"("criado_em");

-- CreateIndex
CREATE UNIQUE INDEX "registros_hora_inicio_hora_fim_key" ON "registros"("hora_inicio", "hora_fim");
