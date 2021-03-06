const db = require('./database');

//createPayment(userId)

async function createPayment({userId, name, number, cid, expiration, billingStreet, city, state, zip}) {
    try {
        const { rows: [payment] } = await db.query(`
        INSERT INTO payments("userId", name, number, cid, expiration)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
    `, [userId, name, number, cid, expiration]);

        return payment;
    } catch (error) {
        throw error;
    }     
}

//getPaymentByUserId(userId)

async function getPaymentsByUserId(userId) {
    try {
        const { rows: payments } = await db.query(`
        SELECT * 
        FROM payments
        WHERE "userId"=$1;
    `, [userId]);

        return payments;  
    } catch (error) {
        throw error;
    }
};

//deletePayment(userId)

async function deletePayment(paymentId) {
    try {
        const {rows} = await db.query(`
        DELETE FROM payments
        WHERE payment_id=$1
        RETURNING *;
        `, [paymentId]);

        return rows;

    } catch (error) {
        throw error;
    }
}

//updatePayments

async function updatePayments(paymentId, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {
        return;
    };

    try {
        const { rows: [ payment ] } = await client.query(`
            UPDATE payments
            SET ${ setString }
            WHERE id=${ paymentId }
            RETURNING *;
        `, Object.values(fields));

        return payment;
    } catch (error) {
        throw error;
    };
};

module.exports = {
    createPayment,
    getPaymentsByUserId,
    deletePayment,
    updatePayments
}