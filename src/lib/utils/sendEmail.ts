import axios from "axios";
import { currencyFormat } from "lib/utils/number";

const messageEmail = ({ amount, products, data }: any) => {
  return `
  - Bạn có 1 đơn đặt hàng mới từ Email ${data.email}
  - Thông tin người đặt hàng :
    + Họ và tên : ${data.name}
    + Số điện thoại : ${data.phoneNumber}
    + Địa chỉ : ${data.provinces} - ${data.district} - ${data.address}
    + Cách thức nhận hàng : ${data.receive}
  - Đơn đặt hàng có ${amount} loại sản phẩm :
  ${products
    .map(
      (p: any) =>
        "- Tên sản phẩm : " +
        p.name +
        " , Số lượng: " +
        p.quantity +
        " , Loại sản phẩm: " +
        p?.categoryRef?.name +
        " , Tổng giá:" +
        currencyFormat(p.totalPrice) +
        "\n"
    )
    .join("")}
  `;
};

export const sendEmail = async (data: any, toast: any, general: any) => {
  const dataSend = {
    service_id: "service_fz6qpeq",
    template_id: "template_6dbm679",
    user_id: "mBAikVEqzn5azSQo7",
    template_params: {
      to_email: general.email,
      message: messageEmail({
        amount: data.products.length,
        products: data.products,
        data,
      }),
    },
  };
  try {
    const res = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      dataSend
    );
    if (res) {
      toast({
        title: "Gửi email đến cửa hàng thành công",
        description:
          "Đơn hàng của bạn đã được gửi đến của hàng, vui lòng chờ phản hồi từ cửa hàng!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  } catch (e) {
    console.log(e);
    toast({
      title: "Gửi email đến cửa hàng không thành công",
      description: "Vui lòng liên hệ đến cửa hàng để được hỗ trợ!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }
};
