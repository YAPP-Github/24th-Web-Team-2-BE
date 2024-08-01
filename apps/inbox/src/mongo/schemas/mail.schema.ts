import { Schema } from 'mongoose';

export const MailSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    provider: {
      messageId: { type: String, required: true },
      source: { type: String, required: true },
    },
    subject: { type: String, required: true },
    date: { type: Date, required: true },
    labels: [String],
    snippet: { type: String, required: true },
    from: {
      address: { type: String, required: true },
      localPart: { type: String, required: true },
      domain: { type: String, required: true },
      name: { type: String, required: true },
    },
    to: { type: String, required: true },
    mimeType: { type: String, required: true },
    payload: [
      {
        partId: { type: Number, required: true },
        mimeType: { type: String, required: true },
        body: { type: String, required: true },
      },
    ],
    categories: [String],
  },
  {
    timestamps: true,
  },
);

// "_id": ObjectId,
// "inboxId": ObjectId,
// "provider": {
//   "messageId": "메시지 id",
//   "source": "GMail"
// },
// subject: "제목",
// date: "발신 시간",
// labels: ["라벨1", "라벨2"],
// snippet: "미리보기 text",
// from: {
//   address: "전체 메일 주소",
//   localPart: "메일 주소의 local part. i.e. inspomailclub"
//   domain: "메일 주소의 domain. i.e. hedwig.com",
//   name: "이름"
// },
// to: "수신자 address",
// mimeType: "mime 타입",
// payload: [
//   {
//     "partId": 오름차순 숫자,
//     "mimeType": "mime 타입",
//     "body": "내용"
//   }
// ],
// categories: ["속한 카테고리1", "속한 카테고리2"]
