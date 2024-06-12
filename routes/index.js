var express = require('express');
var body = require('body-parser');
var bcrypt = require('bcryptjs');
const path = require('path');
var fs = require('fs/promises');
var multer = require('multer');
var jwt = require('jsonwebtoken');

var router = express.Router();

// Định nghĩa các đường dẫn đến các tệp JSON
const warehouseJson = path.join(__dirname, './ConnectJSON/warehouse.json');
const createWarehouseJson = path.join(__dirname, './ConnectJSON/createWarehouse.json');
const intoWarehouseJson = path.join(__dirname, './ConnectJSON/intoWarehouse.json');
const supplierJson = path.join(__dirname, './ConnectJSON/supplier.json');
const documentJson = path.join(__dirname, './ConnectJSON/document.json');
const requestListJson = path.join(__dirname, './ConnectJSON/requestList.json');
const requestTransferExport = path.join(__dirname, './ConnectJSON/requestTransferExport.json');
const memberJson = path.join(__dirname, './ConnectJSON/member.json');
const itemsJson = path.join(__dirname, './ConnectJSON/items.json');
const accountJson = path.join(__dirname, './ConnectJSON/account.json');
const orderApproverJson = path.join(__dirname, './ConnectJSON/orderApprover.json');
const orderSave = path.join(__dirname, './ConnectJSON/orderSave.json');
const orderSaveTransferExport = path.join(__dirname, './ConnectJSON/orderSaveTransferExport.json');
const transferExportApprover = path.join(__dirname, './ConnectJSON/transferExportApprover.json');
const notificationJson = path.join(__dirname, './ConnectJSON/notification.json');
const requestHistory = path.join(__dirname, './ConnectJSON/requestHistory.json');
const requestHistoryTransfer = path.join(__dirname, './ConnectJSON/requestHistoryTransfer.json');
const dataCityJson = path.join(__dirname, './ConnectJSON/data.json');
const accCustomerJson = path.join(__dirname, './ConnectJSON/Account_Customer.json');
const fileImageJson = path.join(__dirname, './ConnectJSON/ImageProfile.json');
const listSendFiendJSON = path.join(__dirname, './ConnectJSON/ListSendFriend.json');
const uploadFileJson = path.join(__dirname, './ConnectJSON/Upload_File.json');

const readJsonFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
        return [];
    }
};

const writeJsonFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 4), 'utf8');
    } catch (err) {
        console.error(`Error writing file to disk: ${err}`);
    }
};

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

// Lấy dữ liệu
router.get('/getRequestTransfer', async (req, res) => {
    const data = await readJsonFile(requestTransferExport);
    res.json(data);
});
router.get('/getTransferExportApprover', async (req, res) => {
    const data = await readJsonFile(transferExportApprover);
    res.json(data);
});
router.get('/getRequestTeamp', async (req, res) => {
    const data = await readJsonFile(orderSave);
    res.json(data);
});
router.get('/getRequestTransferSaveTeamp', async (req, res) => {
    const data = await readJsonFile(orderSaveTransferExport);
    res.json(data);
});
router.get('/getRequestHistory', async (req, res) => {
    const data = await readJsonFile(requestHistory);
    res.json(data);
});
router.get('/getRequestTransferHistory', async (req, res) => {
    const data = await readJsonFile(requestHistoryTransfer);
    res.json(data);
});
router.get('/getWarehouse', async (req, res) => {
    const data = await readJsonFile(warehouseJson);
    res.json(data);
});

router.get('/getCreateWarehouse', async (req, res) => {
    const data = await readJsonFile(createWarehouseJson);
    res.json(data);
});

router.get('/getIntoWarehouse', async (req, res) => {
    const data = await readJsonFile(intoWarehouseJson);
    res.json(data);
});

router.get('/getSupplier', async (req, res) => {
    const data = await readJsonFile(supplierJson);
    res.json(data);
});

router.get('/getDocument', async (req, res) => {
    const data = await readJsonFile(documentJson);
    res.json(data);
});

router.get('/getRequest', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    res.json(data);
});

router.get('/getMember', async (req, res) => {
    const data = await readJsonFile(memberJson);
    res.json(data);
});

router.get('/getItemsList', async (req, res) => {
    const data = await readJsonFile(itemsJson);
    res.json(data);
});

router.get('/getAccount', async (req, res) => {
    const data = await readJsonFile(accountJson);
    res.json(data);
});

router.get('/getApproveOrder', async (req, res) => {
    const data = await readJsonFile(orderApproverJson);
    res.json(data);
});

router.get('/getNotification', async (req, res) => {
    const data = await readJsonFile(notificationJson);
    res.json(data);
});

router.get('/dataCity', async (req, res) => {
    const data = await readJsonFile(dataCityJson);
    res.json(data);
});

router.get('/account_Customer', async (req, res) => {
    const data = await readJsonFile(accCustomerJson);
    res.json(data);
});

router.get('/imageFile', async (req, res) => {
    const data = await readJsonFile(fileImageJson);
    res.json(data);
});

router.get('/listSendFriend', async (req, res) => {
    const data = await readJsonFile(listSendFiendJSON);
    res.json(data);
});

// Thêm dữ liệu
router.post('/addOrderRequest', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const newOrder = req.body;
    data.push(newOrder);
    await writeJsonFile(requestListJson, data);
    res.json({ status: true, message: 'Yêu cầu đã được thêm thành công' });
});

router.post('/addMember', async (req, res) => {
    const data = await readJsonFile(memberJson);
    const newMember = req.body;
    data.push(newMember);
    await writeJsonFile(memberJson, data);
    res.json({ status: true, message: 'Thành viên đã được thêm thành công' });
});

router.post('/addAccount', async (req, res) => {
    const data = await readJsonFile(accountJson);
    let newAccount = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(newAccount.accountPassword, salt);
    newAccount.accountPassword = hash;
    data.push(newAccount);
    await writeJsonFile(accountJson, data);
    res.json({ status: true, message: 'Tài khoản đã được thêm thành công' });
});

router.post('/addItems', async (req, res) => {
    const data = await readJsonFile(itemsJson);
    const newItem = req.body;
    data.push(newItem);
    await writeJsonFile(itemsJson, data);
    res.json({ status: true, message: 'Sản phẩm đã được thêm thành công' });
});

router.post('/addSupplier', async (req, res) => {
    const data = await readJsonFile(supplierJson);
    const newSupplier = req.body;
    data.push(newSupplier);
    await writeJsonFile(supplierJson, data);
    res.json({ status: true, message: 'Nhà cung cấp đã được thêm thành công' });
});

router.post('/addNotification', async (req, res) => {
    const data = await readJsonFile(notificationJson);
    const newNotification = req.body;
    data.push(newNotification);
    await writeJsonFile(notificationJson, data);
    res.json({ status: true, message: 'Thông báo đã được thêm thành công' });
});

router.post('/addApproveDate', async (req, res) => {
    const data = await readJsonFile(orderApproverJson);
    const newApproveDate = req.body;
    data.push(newApproveDate);
    await writeJsonFile(orderApproverJson, data);
    res.json({ status: true, message: 'Ngày duyệt đã được thêm thành công' });
});

router.post('/addCreateWarehouse', async (req, res) => {
    const data = await readJsonFile(createWarehouseJson);
    const newCreateWarehouse = req.body;
    data.push(newCreateWarehouse);
    await writeJsonFile(createWarehouseJson, data);
    res.json({ status: true, message: 'Kho mới đã được thêm thành công' });
});

router.post('/addIntoWarehouse', async (req, res) => {
    const data = await readJsonFile(intoWarehouseJson);
    const newIntoWarehouse = req.body;
    data.push(newIntoWarehouse);
    await writeJsonFile(intoWarehouseJson, data);
    res.json({ status: true, message: 'Hàng nhập kho đã được thêm thành công' });
});

router.post('/addWarehouse', async (req, res) => {
    const data = await readJsonFile(warehouseJson);
    const newWarehouse = req.body;
    data.push(newWarehouse);
    await writeJsonFile(warehouseJson, data);
    res.json({ status: true, message: 'Kho đã được thêm thành công' });
});

router.post('/addDocument', async (req, res) => {
    const data = await readJsonFile(documentJson);
    const newDocument = req.body;
    data.push(newDocument);
    await writeJsonFile(documentJson, data);
    res.json({ status: true, message: 'Chứng từ đã được thêm thành công' });
});

router.post('/addApproveDateTransferExport', async (req, res) => {
    const data = await readJsonFile(orderApproverJson);
    const newApproveDateTransferExport = req.body;
    data.push(newApproveDateTransferExport);
    await writeJsonFile(orderApproverJson, data);
    res.json({ status: true, message: 'Ngày duyệt xuất đã được thêm thành công' });
});

router.post('/addTransferExportRequest', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const newTransferExportRequest = req.body;
    data.push(newTransferExportRequest);
    await writeJsonFile(requestListJson, data);
    res.json({ status: true, message: 'Yêu cầu xuất kho đã được thêm thành công' });
});

router.post('/addOrderRequestTeamp', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const newOrderRequestTeamp = req.body;
    data.push(newOrderRequestTeamp);
    await writeJsonFile(requestListJson, data);
    res.json({ status: true, message: 'Yêu cầu tạm thời đã được thêm thành công' });
});

router.post('/addTransferExportRequestTemp', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const newTransferExportRequestTemp = req.body;
    data.push(newTransferExportRequestTemp);
    await writeJsonFile(requestListJson, data);
    res.json({ status: true, message: 'Yêu cầu xuất kho tạm thời đã được thêm thành công' });
});

// Cập nhật dữ liệu
router.post('/updateDataMember', async (req, res) => {
    const data = await readJsonFile(memberJson);
    const updatedMember = req.body.pushDataNewMember[0];
    const index = data.findIndex(member => member.id === updatedMember.id);
    if (index !== -1) {
        data[index] = updatedMember;
        await writeJsonFile(memberJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Thành viên không tồn tại' });
    }
});

router.post('/updatedataSupplier', async (req, res) => {
    const data = await readJsonFile(supplierJson);
    const updatedSupplier = req.body.pushDataNewSuplier[0];
    const index = data.findIndex(supplier => supplier.id === updatedSupplier.id);
    if (index !== -1) {
        data[index] = updatedSupplier;
        await writeJsonFile(supplierJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Nhà cung cấp không tồn tại' });
    }
});

router.post('/updateNotification', async (req, res) => {
    const data = await readJsonFile(notificationJson);
    const { id, isRead } = req.body;
    const index = data.findIndex(notification => notification.id === id);
    if (index !== -1) {
        data[index].isRead = isRead;
        await writeJsonFile(notificationJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Thông báo không tồn tại' });
    }
});

router.post('/updateNotificationPointInto', async (req, res) => {
    const data = await readJsonFile(notificationJson);
    const { idRequest, status, pointApprovedInto, isRead, dateCreated } = req.body;
    const index = data.findIndex(notification => notification.idRequest === idRequest);
    if (index !== -1) {
        data[index].status = status;
        data[index].pointApprovedInto = pointApprovedInto;
        data[index].isRead = isRead;
        data[index].dateCreated = dateCreated;
        await writeJsonFile(notificationJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Thông báo không tồn tại' });
    }
});

router.post('/upateAccount', async (req, res) => {
    const data = await readJsonFile(accountJson);
    const { accountCode, accountStatus, accountDateUpdate } = req.body;
    const index = data.findIndex(account => account.accountCode === accountCode);
    if (index !== -1) {
        data[index].accountStatus = accountStatus;
        data[index].accountDateUpdate = accountDateUpdate;
        await writeJsonFile(accountJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Tài khoản không tồn tại' });
    }
});

router.post('/updatePurchaseExport', async (req, res) => {
    const data = await readJsonFile(orderApproverJson);
    const { dataRequestExportPDF } = req.body;
    dataRequestExportPDF.forEach(item => {
        const index = data.findIndex(order => order.idRequest === item.id);
        if (index !== -1) {
            data[index].datePrint = item.dateUpdate;
        }
    });
    await writeJsonFile(orderApproverJson, data);
    res.json({ message: 'All updates successful' });
});

router.post('/updateRequestTransferExport', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { dataRequestExportPDF } = req.body;
    dataRequestExportPDF.forEach(item => {
        const index = data.findIndex(request => request.id === item.id);
        if (index !== -1) {
            data[index].requestTransferTotalAmountExport = item.requestTransferTotalAmountExport;
            data[index].requestTransferAmountExport = item.requestTransferAmountExport;
            data[index].requestTransferWarehouseResidual = item.requestTransferWarehouseResidual;
            data[index].requestTransferIntoMoney = item.requestTransferIntoMoney;
            data[index].requestDateUpdate = item.requestDateUpdate;
            data[index].requestDateVouchers = item.requestDateVouchers;
            data[index].requestTransferPending = parseInt(item.requestTransferTotalAmountExport) < parseInt(item.requestTransferAmountApproved) ? 1 : 0;
            if (item.isIdHistoryUpdated) {
                data[index].requestIdHistory = item.idHistory;
            }
        }
    });
    await writeJsonFile(requestListJson, data);
    res.json({ message: 'All updates successful' });
});

router.post('/updateRequestTransferExportApprove', async (req, res) => {
    const data = await readJsonFile(orderApproverJson);
    const { dataRequestExportPDF } = req.body;
    dataRequestExportPDF.forEach(item => {
        const index = data.findIndex(order => order.idRequest === item.id);
        if (index !== -1) {
            data[index].datePrint = item.requestDateUpdate;
        }
    });
    await writeJsonFile(orderApproverJson, data);
    res.json({ message: 'All updates successful' });
});

router.post('/updateWarehouseResidual', async (req, res) => {
    const data = await readJsonFile(warehouseJson);
    const { dataRequestExportPDF } = req.body;
    dataRequestExportPDF.forEach(item => {
        const index = data.findIndex(warehouse => warehouse.warehouseItemsCode === item.warehouseItemsCode);
        if (index !== -1) {
            data[index].warehouseResidual = item.requestTransferWarehouseResidual;
            data[index].warehouseDateUpdate = item.requestDateUpdate;
            data[index].exportWarehouseDate = item.requestDateUpdate;
        }
    });
    await writeJsonFile(warehouseJson, data);
    res.json({ message: 'All updates successful' });
});

router.post('/intoRequestTransferExportHistory', async (req, res) => {
    const data = await readJsonFile(orderApproverJson);
    const { idHistory, caseRequest, idRequestTransfers, dateCreated } = req.body;
    data.push({ idHistory, idRequestTransfers, caseRequest, dateCreated });
    await writeJsonFile(orderApproverJson, data);
    res.json({ status: true, message: 'Thêm thành công' });
});

router.post('/updatedataListAccount', async (req, res) => {
    const data = await readJsonFile(accountJson);
    const updatedAccount = req.body.pushDataNewAccount[0];
    const index = data.findIndex(account => account.accountCode === updatedAccount.accountCode);
    if (index !== -1) {
        data[index] = updatedAccount;
        await writeJsonFile(accountJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Tài khoản không tồn tại' });
    }
});

router.post('/updatedataRequestList', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const updatedRequest = req.body.pushDataRequest[0];
    const index = data.findIndex(request => request.id === updatedRequest.id);
    if (index !== -1) {
        data[index].unitPrice = updatedRequest.unitPrice;
        data[index].intoMoney = updatedRequest.intoMoney;
        data[index].dateUpdate = updatedRequest.dateUpdate;
        await writeJsonFile(requestListJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Yêu cầu không tồn tại' });
    }
});

router.post('/updatedataItemsList', async (req, res) => {
    const data = await readJsonFile(itemsJson);
    const updatedItem = req.body.pushDataNewItemsList[0];
    const index = data.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
        data[index] = updatedItem;
        await writeJsonFile(itemsJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
});

router.post('/updateAppremovedRequest', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { id, statusOrder, orderSupplierName, orderPointApprove, dateUpdate, reasonMessage, orderComplete } = req.body;
    const index = data.findIndex(request => request.id === id);
    if (index !== -1) {
        data[index].orderSupplierName = orderSupplierName;
        data[index].orderPointApprove = orderPointApprove;
        data[index].statusOrder = statusOrder;
        data[index].orderReason = reasonMessage;
        data[index].dateUpdate = dateUpdate;
        data[index].orderComplete = orderComplete;
        await writeJsonFile(requestListJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Yêu cầu không tồn tại' });
    }
});

router.post('/updateAppremovedRequestComplete', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { idHistory, orderComplete, dataRequestExportPDF } = req.body;
    dataRequestExportPDF.forEach(item => {
        const index = data.findIndex(request => request.id === item.id);
        if (index !== -1) {
            data[index].idHistory = idHistory;
            data[index].dateUpdate = item.dateUpdate;
            data[index].orderComplete = orderComplete;
        }
    });
    await writeJsonFile(requestListJson, data);
    res.json({ message: 'All updates successful' });
});

router.post('/intoRequestHistory', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { idHistory, idRequests, dateCreated } = req.body;
    data.push({ idHistory, idRequests, dateCreated });
    await writeJsonFile(requestListJson, data);
    res.json({ status: true, message: 'Thêm thành công' });
});

router.post('/updateAppremovedTransferComplete', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { requestTransferComplete, dataRequestExportPDF } = req.body;
    dataRequestExportPDF.forEach(item => {
        const index = data.findIndex(request => request.id === item.id);
        if (index !== -1) {
            data[index].requestTransferComplete = requestTransferComplete;
        }
    });
    await writeJsonFile(requestListJson, data);
    res.json({ message: 'All updates successful' });
});

router.post('/removeOrderTeamp', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { id } = req.body;
    const index = data.findIndex(order => order.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        await writeJsonFile(requestListJson, data);
        res.json({ message: 'Xóa thành công' });
    } else {
        res.status(404).json({ message: 'Yêu cầu không tồn tại' });
    }
});

router.post('/removeTransferExportRequestTeamp', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { id } = req.body;
    const index = data.findIndex(order => order.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        await writeJsonFile(requestListJson, data);
        res.json({ message: 'Xóa thành công' });
    } else {
        res.status(404).json({ message: 'Yêu cầu không tồn tại' });
    }
});

router.post('/updateOrderRequestTeamp', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const updatedOrderRequestTeamp = req.body;
    const index = data.findIndex(order => order.id === updatedOrderRequestTeamp.id);
    if (index !== -1) {
        data[index] = updatedOrderRequestTeamp;
        await writeJsonFile(requestListJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Yêu cầu tạm thời không tồn tại' });
    }
});

router.post('/updateTransferExportRequestTemp', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const updatedTransferExportRequestTemp = req.body;
    const index = data.findIndex(request => request.id === updatedTransferExportRequestTemp.id);
    if (index !== -1) {
        data[index] = updatedTransferExportRequestTemp;
        await writeJsonFile(requestListJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Yêu cầu tạm thời không tồn tại' });
    }
});

router.post('/updatedataWarehouseList', async (req, res) => {
    const data = await readJsonFile(warehouseJson);
    const updatedWarehouse = req.body.pushdataWarehouse[0];
    const index = data.findIndex(warehouse => warehouse.id === updatedWarehouse.id);
    if (index !== -1) {
        data[index].warehouseExpectedOut = updatedWarehouse.warehouseExpectedOut;
        data[index].warehouseQuotaMin = updatedWarehouse.warehouseQuotaMin;
        data[index].warehouseQuotaMax = updatedWarehouse.warehouseQuotaMax;
        data[index].warehouseDateUpdate = updatedWarehouse.warehouseDateUpdate;
        await writeJsonFile(warehouseJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Kho không tồn tại' });
    }
});

router.post('/updateWarehouseInto', async (req, res) => {
    const data = await readJsonFile(warehouseJson);
    const { warehouseType, warehouseItemsCode, warehouseItemsName, warehouseAreaName, warehouseItemsCommodities, warehouseUnitPrice, warehouseResidual, warehouseUnit, intoWarehouseCode, intoWarehouseDate } = req.body;
    const index = data.findIndex(warehouse => warehouse.warehouseItemsCode === warehouseItemsCode);
    if (index !== -1) {
        data[index].warehouseType = warehouseType;
        data[index].warehouseItemsName = warehouseItemsName;
        data[index].warehouseAreaName = warehouseAreaName;
        data[index].warehouseItemsCommodities = warehouseItemsCommodities;
        data[index].warehouseUnitPrice = warehouseUnitPrice;
        data[index].warehouseResidual = warehouseResidual;
        data[index].warehouseUnit = warehouseUnit;
        data[index].intoWarehouseCode = intoWarehouseCode;
        data[index].intoWarehouseDate = intoWarehouseDate;
        await writeJsonFile(warehouseJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Kho không tồn tại' });
    }
});

router.post('/updatedataWarehouseListStatus', async (req, res) => {
    const data = await readJsonFile(warehouseJson);
    const { id, warehouseDateUpdate, warehouseStatus } = req.body;
    const index = data.findIndex(warehouse => warehouse.id === id);
    if (index !== -1) {
        data[index].warehouseStatus = warehouseStatus === 'Đang sử dụng' ? 'Đang sử dụng' : 'Không dùng';
        data[index].warehouseDateUpdate = warehouseDateUpdate;
        await writeJsonFile(warehouseJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Kho không tồn tại' });
    }
});

router.post('/updateAppremovedRequestTransferExport', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { id, requestTransferPointApprove, requestTransferStatus, requestDateUpdate, requestTransferReason, requestTransferComplete } = req.body;
    const index = data.findIndex(request => request.id === id);
    if (index !== -1) {
        data[index].requestTransferPointApprove = requestTransferPointApprove;
        data[index].requestTransferStatus = requestTransferStatus;
        data[index].requestDateUpdate = requestDateUpdate;
        data[index].requestTransferReason = requestTransferReason;
        data[index].requestTransferComplete = requestTransferComplete;
        await writeJsonFile(requestListJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Yêu cầu không tồn tại' });
    }
});

router.post('/updateChangePassword', async (req, res) => {
    const data = await readJsonFile(accountJson);
    let { id, accountEmail, accountPassword, accountDateUpdate } = req.body;
    const index = data.findIndex(account => account.id === id);
    if (index !== -1) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(accountPassword, salt);
        accountPassword = hash;
        data[index].accountPassword = accountPassword;
        data[index].accountEmail = accountEmail;
        data[index].accountDateUpdate = accountDateUpdate;
        await writeJsonFile(accountJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Tài khoản không tồn tại' });
    }
});

router.post('/login_Account', async (req, res) => {
    try {
        const dataLogin = req.body.dataLogin;
        const { username, password } = req.body;
        const data = await readJsonFile(accountJson);
        const user = data.find(account => account.accountUserName === username || account.accountEmail === username);
        if (user && bcrypt.compareSync(password, user.accountPassword)) {
            const hashPermission = bcrypt.hashSync(user.accountPermission, 10);
            const dataToEncode = {
                id: user.id,
                accountCode: user.accountCode,
                accountUserName: user.accountUserName,
                accountPermission: hashPermission,
                accountEmail: user.accountEmail,
            };
            const tokenData = jwt.sign(dataToEncode, 'data1991');
            res.json({
                id: user.id,
                message: 'Đăng nhập thành công',
                isLogin: true,
                tokenData,
                hashPermission,
            });
        } else {
            res.json({
                message: 'Đăng nhập không thành công',
                token: '',
                isLogin: false,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/decodeData', (req, res) => {
    const { encode } = req.body;
    if (encode) {
        try {
            const decodedData = jwt.verify(encode, 'data1991');
            res.json({
                message: 'Mã hóa thất thành công',
                isDeCode: true,
                decodedData,
            });
        } catch (err) {
            res.json({
                message: 'Mã hóa thất bại',
                decodedData: [],
                isDeCode: false,
            });
        }
    } else {
        res.json({
            message: 'Mã hóa thất bại',
            decodedData: [],
            isDeCode: false,
        });
    }
});



router.post('/signUp_Account', async (req, res) => {
    const data = await readJsonFile(accCustomerJson);
    const newAccount = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(newAccount.password, salt);
    newAccount.password = hash;
    const index = data.findIndex(account => account.email === newAccount.email);
    if (index !== -1) {
        data[index].password = newAccount.password;
        data[index].dateTimeEdit = newAccount.dateTimeEdit;
    } else {
        data.push(newAccount);
    }
    await writeJsonFile(accCustomerJson, data);
    res.json(data);
});

router.post('/updateAccount', async (req, res) => {
    const data = await readJsonFile(accCustomerJson);
    const dataProfile = req.body.dataProfile;
    const index = data.findIndex(account => account.id === dataProfile.id);
    if (index !== -1) {
        data[index] = dataProfile;
        await writeJsonFile(accCustomerJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Tài khoản không tồn tại' });
    }
});

router.post('/imageFile', async (req, res) => {
    const data = await readJsonFile(fileImageJson);
    const { id, email, image = '' } = req.body;
    const index = data.findIndex(profile => profile.id === id);
    if (index !== -1) {
        data[index].image = image;
    } else {
        data.push({ id, email, image });
    }
    await writeJsonFile(fileImageJson, data);
    res.json(data);
});



router.post('/uploadFile', async (req, res) => {
    const data = await readJsonFile(uploadFileJson);
    const newFile = req.body;
    data.push(newFile);
    await writeJsonFile(uploadFileJson, data);
    res.json(data);
});

router.get('/:name', (req, res) => {
    const fileName = req.params.name;
    if (!fileName) {
        return res.send({
            status: false,
            message: 'no filename specified',
        });
    }
    res.sendFile(path.resolve(`./public/fileMp3/${fileName}`));
});


module.exports = router;
