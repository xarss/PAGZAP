-- Trigger
select * from payments where userId = '389571' and active = 1 and status != 'pago' and due >= date(now());