const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
        user: 'support@lifemart.site',
        pass: 'Matkhau@01'
    },
    // tls: {
    //     rejectUnauthorized: false
    // }
});

module.exports = (orders) => {
    let report = '';
    orders.products.forEach(el => {
        report += `<tr style="height: 30px">
            <td style="text-align: left;padding-left: 20px;">${el.product.name}</td>
            <td>${el.product.price.toLocaleString()} VNĐ</td>
            <td>${el.amount}</td>
            <td>${el.product.price * el.amount} VNĐ</td>
        </tr>`;
    });
    const content = `
    <div style="background-color:white">
        <div style="padding:10px 0px; color: #000">
            <h3>Người đặt, ${orders.fullname}</h3>
            <p>Phone: ${orders.phone}</p>
            <p>Address: ${orders.address}</p>
            <hr style="opacity: 0.75;"/>
            <table style="width: 100%;text-align: center;border: 1px solid #eee; margin: 30px 0">
                <thead style="border-bottom: 1px solid #eee;background: #eee;">
                    <tr style="height: 35px">
                        <th>Tên sản phẩm</th><th>Giá</th><th>Số lượng</th><th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>${report}</tbody>
            </table>
            <h4 style="margin-bottom: 30px; text-align: right;">Tổng thanh toán: ${orders.totalPrice.toLocaleString()} VNĐ</h4>
            
        </div>
    </div>
    `;
    transporter.sendMail({
        from: 'support@lifemart.site',
        to: 'lifemarttb@gmail.com',
        subject: 'Có đơn hàng mới được đặt!',
        html: content
    }, (err, info) => {
        if (err) {
            console.log(err);
            return false;
        }
        console.log(info.response);

        return true;
    });
};