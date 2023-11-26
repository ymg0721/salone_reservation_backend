// routes/books.js
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

router.get("/", async (req, res, next) => {
  const prisma = new PrismaClient();
  const allBooks = await prisma.user.findMany();
  res.json(allBooks);
});

// 新規データ作成
router.post("/", async (req, res, next) => {
  const prisma = new PrismaClient();
  const data = { data: req.body };
  const book = await prisma.user.create(data);
  res.json(book);
});

// 更新
router.put("/", async (req, res, next) => {
  const prisma = new PrismaClient();
  //prismaの更新は where:とdata:で指定する。
  //{where: {条件},data:{key:value,key:value}}
  const data = { where: { id: req.body.id }, data: req.body };
  const book = await prisma.user.update(data);
  res.json(book);
});

// 削除
router.delete("/", async (req, res, next) => {
  const prisma = new PrismaClient();
  //prismaの削除は{where:{条件}}で指定する。
  const data = { where: { id: req.body.id } };
  const book = await prisma.user.delete(data);
  res.json(book);
});

module.exports = router;
