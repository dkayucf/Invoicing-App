$('.issueDate').datepicker({
    uiLibrary: 'bootstrap4'
});
$('.dueDate').datepicker({
    uiLibrary: 'bootstrap4'

});

//==============STORAGE CONTROLLER=================
const StorageCtrl = (function(){
    
    //Public Methods
    return {
        //Store Vendors in local storage
        storeVendor: function (newVendorData) {            

            const Vendor = function(id, vendorData){
                this.id = id;
                this.vendorData = vendorData;
            }
            let newVendor,
                vendors,
                id;
            //Check if any items in local storage
            if(localStorage.getItem('vendors') === null){

                vendors = [];
                id = 0;
                
                //Instantiate a new vendor object
                newVendor = new Vendor(id, newVendorData);
                
                //Push new vendor item
                vendors.push(newVendor);        
                //Set Local storage
                localStorage.setItem('vendors', JSON.stringify(vendors));
            } else {
                //Get vendors already in local storage
                vendors = JSON.parse(localStorage.getItem('vendors'));

                if(vendors.length > 0){
                    
                    id = vendors[vendors.length - 1].id + 1;

                    //Instantiate a new vendor object
                    newVendor = new Vendor(id, newVendorData);
                    
                    //Push new vendor item
                    vendors.push(newVendor);             
                    //Re-Set Local Storage
                    localStorage.setItem('vendors', JSON.stringify(vendors));
                }
    
            }
        },
        //Store Business in local storage
        storeBusiness: function(newBusiness){
            localStorage.setItem('business', JSON.stringify(newBusiness));
        },
        storeEmployee: function(key, employeeInput){
            const Employee = function(employeeId, employeeInput){
                this.employeeId = employeeId;
                this.employeeInput = employeeInput;
            }
            
            let newEmployee,
                employees,
                employeeId;
            
            if(localStorage.getItem(key) === null){
                employees = [];
                employeeId = 0;
                
                newEmployee = new Employee(employeeId, employeeInput);
                
                employees.push(newEmployee);
                
                localStorage.setItem(key, JSON.stringify(employees));
            }else {
                
                employees = JSON.parse(localStorage.getItem(key));
                
                if(employees.length > 0){
                    employeeId = employees[employees.length - 1].employeeId + 1;

                    //Instantiate a new invoice object
                    newEmployee = new Employee(employeeId, employeeInput);

                    //Push new invoice item
                    employees.push(newEmployee); 

                    //Re-Set Local Storage
                    localStorage.setItem(key, JSON.stringify(employees));    
                }
                
                
            }
        },
        storeItemType: function(key, itemInput){
            let newItem,
                items,
                itemId;
                   
            const Item = function(itemId, itemInput){
                this.itemId = itemId;
                this.itemInput = itemInput;
            }

            if(localStorage.getItem(key) === null){
                items = [];
                itemId = 0;
                
                newItem = new Item(itemId, itemInput);
                
                items.push(newItem);
                
                localStorage.setItem(key, JSON.stringify(items));
            }else {
                
                items = JSON.parse(localStorage.getItem(key));
                
                if(items.length > 0){
                    itemId = items[items.length - 1].itemId + 1;

                    //Instantiate a new Item object
                    newItem = new Item(itemId, itemInput);

                    //Push new new item
                    items.push(newItem); 

                    //Re-Set Local Storage
                    localStorage.setItem(key, JSON.stringify(items));    
                }
                
                
            }
        },
        //Store Invoices in local storage
        storeInvoice: function (newInvoiceData) {            

            const Invoice = function(invoiceID, invoiceData){
                this.invoiceID = invoiceID;
                this.invoiceData = invoiceData;
            }
            
            let newInvoice,
                invoices,
                invoiceID;
            
            //Check if any items in local storage
            if(localStorage.getItem('invoices') === null){

                invoices = [];
                invoiceID = 0;
                
                //Instantiate a new invoice object
                newInvoice = new Invoice(invoiceID, newInvoiceData);
                
                //Push new invoice item
                invoices.push(newInvoice);
                
                //Set Local storage
                localStorage.setItem('invoices', JSON.stringify(invoices));
            } else {
                //Get invoices already in local storage
                invoices = JSON.parse(localStorage.getItem('invoices'));

                if(invoices.length > 0){
                    
                    invoiceID = invoices[invoices.length - 1].invoiceID + 1;

                    //Instantiate a new invoice object
                    newInvoice = new Invoice(invoiceID, newInvoiceData);
                    
                    //Push new invoice item
                    invoices.push(newInvoice); 
                    
                    //Re-Set Local Storage
                    localStorage.setItem('invoices', JSON.stringify(invoices));
                }
    
            }
        },
        updateVendorStorage: function(selectValue, inputs, key){
           
            let retrievedData = StorageCtrl.getGenericFromStorage(key);
            
            if(retrievedData.length > 0){
                
                retrievedData.forEach((datum, index)=>{
                    
                    if(datum.id === parseInt(selectValue)){
                        datum.vendorData = inputs;
                    }
                    return retrievedData;
                });

                localStorage.setItem(key, JSON.stringify(retrievedData))
                
            }
           
        },
        updateInvoiceItem: function(key, invoiceId, itemId, updatedInputs){
            let retrievedData = StorageCtrl.getGenericFromStorage(key);

            retrievedData.forEach(x=>{
                if(x.invoiceID === invoiceId){
                    x.invoiceData.invoiceItems.forEach(y=>{
                        if(y.id === itemId){
                            y.itemType = updatedInputs.itemType;
                            y.itemDescription = updatedInputs.description;
                            y.itemQuantity = updatedInputs.quantity;
                            y.itemUnitPrice = updatedInputs.unitPrice;
                            y.itemAmount = updatedInputs.itemAmount; 
                        }    
                    }); 
                }    
            });
            localStorage.setItem(key, JSON.stringify(retrievedData));

        },
        updateInvoice: function(key, selectedInvoiceId, retrieveItems, vendorInputs, businessInputs, invoiceInfo){
            let retrieveStorage = StorageCtrl.getGenericFromStorage(key);

            retrieveStorage.forEach(item=>{
               if(item.invoiceID === selectedInvoiceId){
                   let oldData = item.invoiceData;
                   
                   oldData.amountDue = invoiceInfo.amountDue;
                   oldData.businessFrom = businessInputs;
                   oldData.comments = invoiceInfo.comments;
                   oldData.dueDate = invoiceInfo.dueDate;
                   oldData.invoiceId = invoiceInfo.invoiceID;
                   oldData.invoiceItems = retrieveItems;
                   oldData.issueDate = invoiceInfo.issueDate;
                   oldData.payments = invoiceInfo.payments;
                   oldData.salesPerson = invoiceInfo.salesPerson;
                   oldData.subject = invoiceInfo.subject;
                   oldData.subtotal = invoiceInfo.subtotal;
                   oldData.taxAmount = invoiceInfo.taxAmount;
                   oldData.taxRate = invoiceInfo.taxRate;
                   oldData.vendorTo = [vendorInputs];
               } 
            });
            localStorage.setItem(key, JSON.stringify(retrieveStorage));
            
        },
        getGenericFromStorage: function(item){
            let genericItems;

            if(localStorage.getItem(item) === null){
                genericItems = [];
            } else {
                genericItems = JSON.parse(localStorage.getItem(item));
            }
            return genericItems;
        },
        retrieveInvoiceItems: function(key, invoiceId, itemId){
            let retrievedInvoices = StorageCtrl.getGenericFromStorage(key),
                invItem;
                retrievedInvoices.forEach(x=>{
                    if(x.invoiceID === invoiceId){
                        x.invoiceData.invoiceItems.forEach(y=> {
                            if(y.id === itemId){
                                invItem = y;
                            }
                        });
                    }    
                });
            
            return invItem;
        }
        
    }
    
})();


//===============ITEM CONTROLLER==================
const ItemCtrl = (function(){

    const Vendors = function(vendorName, vendorEmail, vendorPhone, vendorAddress, vendorCity, vendorState, vendorZip){
        this.vendorName = vendorName;
        this.vendorEmail = vendorEmail;
        this.vendorPhone = vendorPhone;
        this.vendorAddress = vendorAddress;
        this.vendorCity = vendorCity;
        this.vendorState = vendorState;
        this.vendorZip = vendorZip;
    }
    
    const Business = function(id, businessName, businessEmail, businessPhone, businessAddress, businessCity, businessState, businessZip){
        this.id = id;
        this.businessName = businessName;
        this.businessEmail = businessEmail;
        this.businessPhone = businessPhone;
        this.businessAddress = businessAddress;
        this.businessCity = businessCity;
        this.businessState = businessState;
        this.businessZip = businessZip;
    }
    
    const InvoiceItem = function(id, itemType, itemDescription, itemQuantity, itemUnitPrice, itemAmount){
        this.id = id;
        this.itemType = itemType;
        this.itemDescription = itemDescription;
        this.itemQuantity = itemQuantity;
        this.itemUnitPrice = itemUnitPrice;
        this.itemAmount = itemAmount;
    }
    
    const usStates = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

    
    const invoiceData = {
        salesPerson: null,
        invoiceId: null,
        issueDate: null,
        dueDate: null,
        subject: null,
        invoiceItems: [],
        businessFrom: [],
        vendorTo: [],
        comments: null,
        subtotal: null,
        taxRate: null,
        taxAmount: null,
        payments: null,
        amountDue: null,
        status: 'Due'
    }
    
    const vendorsList = {
        vendors: []
    }
    
    //Public Methods
    return {
        
        resetDataStructure: ()=> {
            invoiceData.salesPerson = null;
            invoiceData.invoiceId = null;
            invoiceData.issueDate = null;
            invoiceData.dueDate = null;
            invoiceData.subject = null;
            invoiceData.invoiceItems = [];
            invoiceData.businessFrom = [];
            invoiceData.vendorTo = [];
            invoiceData.comments = null;
            invoiceData.subtotal = null;
            invoiceData.taxRate = null;
            invoiceData.taxAmount = null;
            invoiceData.payments = null;
            invoiceData.amountDue = null;
            invoiceData.status = 'Due';
        },
        addVendor: (vendorInputs)=>{
            let newVendor;
            
            //Instantiate a new vendor object
            newVendor = new Vendors(vendorInputs.vendorName, vendorInputs.vendorEmail, vendorInputs.vendorPhone, vendorInputs.vendorAddress, vendorInputs.vendorCity, vendorInputs.vendorState, vendorInputs.vendorZip);
        
            vendorsList.vendors.push(newVendor);
            
            return newVendor;
        },
        addBusiness: (businessInputs)=>{
            let newBusiness,
                id = 0;
            
            //Instantiate a new business object
            newBusiness = new Business(id, businessInputs.businessName, businessInputs.businessEmail, businessInputs.businessPhone, businessInputs.businessAddress, businessInputs.businessCity, businessInputs.businessState, businessInputs.businessZip);
            
            //Add new business to storage
            StorageCtrl.storeBusiness(newBusiness);
        },
        addItems: (itemInputs)=> {
            let newItem,
                ID,
                quantity,
                unitprice,
                itemAmount;
            
            //Add auto-increment id
            if(invoiceData.invoiceItems.length > 0){
                ID = invoiceData.invoiceItems[invoiceData.invoiceItems.length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            quantity = parseInt(itemInputs.quantity);
            unitprice = parseFloat(itemInputs.unitPrice);
            itemAmount = parseFloat(itemInputs.itemAmount);
            
            
            
            newItem = new InvoiceItem(ID, itemInputs.itemType, itemInputs.description, quantity, unitprice, itemAmount);
            
            invoiceData.invoiceItems.push(newItem);
            
            return newItem;
            
        },
        addInvoice: (vendorInputs, businessInputs, invoiceInfo)=> {
            let today = new Date().getTime();
            
            invoiceData.salesPerson = invoiceInfo.salesPerson;
            invoiceData.invoiceId = invoiceInfo.invoiceID;
            invoiceData.issueDate = invoiceInfo.issueDate;
            invoiceData.dueDate = invoiceInfo.dueDate;
            invoiceData.subject = invoiceInfo.subject;
            invoiceData.businessFrom.push(businessInputs);
            invoiceData.vendorTo.push(vendorInputs);
            invoiceData.comments = invoiceInfo.comments;
            invoiceData.subtotal = invoiceInfo.subtotal;
            invoiceData.taxRate = invoiceInfo.taxRate;
            invoiceData.taxAmount = invoiceInfo.taxAmount;
            invoiceData.payments = invoiceInfo.payments;
            invoiceData.amountDue = invoiceInfo.amountDue;
            if(invoiceInfo.amountDue === 0){
                invoiceData.status = 'Paid';
            }else if(invoiceInfo.amountDue > 0 && today > invoiceInfo.dueDate){
                invoiceData.status = 'Past Due';
            }else {
                invoiceData.status = 'Due';
            }
            StorageCtrl.storeInvoice(invoiceData);
            
        },
        addRetrievedData: (retrievedInvoice)=>{
            let today = new Date().getTime();

            invoiceData.comments = retrievedInvoice.comments;
            invoiceData.salesPerson = retrievedInvoice.salesPerson;
            invoiceData.invoiceId = retrievedInvoice.invoiceId;
            invoiceData.issueDate = retrievedInvoice.issueDate;
            invoiceData.dueDate = retrievedInvoice.dueDate;
            invoiceData.subject = retrievedInvoice.subject;
            invoiceData.invoiceItems = retrievedInvoice.invoiceItems;
            invoiceData.businessFrom = retrievedInvoice.businessFrom;
            invoiceData.vendorTo = retrievedInvoice.vendorTo;
            invoiceData.subtotal = retrievedInvoice.subtotal;
            invoiceData.taxRate = retrievedInvoice.taxRate;
            invoiceData.taxAmount = retrievedInvoice.taxAmount;
            invoiceData.payments = retrievedInvoice.payments;
            invoiceData.amountDue = retrievedInvoice.amountDue;
            return invoiceData;
        },
        calcSubtotal: ()=>{
            let invItems = invoiceData.invoiceItems,
                subtotal = 0;

            if(invItems.length > 0){
                invItems.forEach(item => {
                    subtotal += item.itemAmount;
                });
            }

            return subtotal;
        },
        updateInvoiceStatus:(retrievedData)=> {
            let currentTime = new Date().getTime();

            retrievedData.forEach(datum=>{
                if(datum.invoiceData.amountDue === 0){
                    datum.invoiceData.status = 'Paid';
                }else if(datum.invoiceData.status === 'Due' && currentTime > datum.invoiceData.dueDate){
                    datum.invoiceData.status = 'Past Due';
                }
            });   
        },
        updateInvoiceItem:(itemID, newInput)=>{
            let itemQuantity = parseInt(newInput.quantity),
                unitPrice = parseFloat(newInput.unitPrice),
                itemAmount = parseFloat(newInput.itemAmount);

            invoiceData.invoiceItems.forEach(item=>{
                if(item.id === itemID){
                    item.itemAmount = itemAmount;
                    item.itemDescription = newInput.description;
                    item.itemQuantity = itemQuantity;
                    item.itemType = newInput.itemType;
                    item.itemUnitPrice = unitPrice;
                }    
            }); 

        },
        getUSStates:()=>{
            return usStates;     
        },
        retrieveInvoiceItems: ()=>{
            return invoiceData.invoiceItems;
        }
    }

})();



//================UI CONTROLLER==================
const UICtrl = (function($){
    const USStates = ItemCtrl.getUSStates();
    
    const UISelectors = {
        //Buttons
        addVendors: '.addVendors',
        addSalesPerson: '.addSalesPerson',
        addItemType: '.addItemType',
        addNewItem: '.addNewItem',
        editVendor: '.editVendor',
        editBusiness: '.editBusiness',
        editInvoiceItem: '.editInvoiceItem',
        updateVendor: '.updateVendor',
        saveInvoice: '.saveInvoice',
        saveVendor: '.saveVendor',
        saveBusiness: '.saveBusiness',
        saveSalesPerson: '.saveSalesPerson',
        saveItemType: '.saveItemType',
        pdfView: '.pdfView',
        backBtn: '#backBtn1',
        backBtn2: '.backBtn2',
        backBtn3: '#backBtn3',
        updateInvoice: '.updateInvoice',
        updateItem: '.updateItem',
        newInvoice: '.newInvoice',
        deleteInvoiceItem: '.deleteInvoiceItem',
        
        
        //Inputs
        invoiceId: '.invoiceId',
        issueDate: '.issueDate',
        dueDate: '.dueDate',
        invoiceSubject: '.invoiceSubject',
        vendorName: '.vendorName',
        vendorEmail: '.vendorEmail',
        vendorPhone: '.vendorPhone',
        vendorAddress: '.vendorAddress',
        vendorCity: '.vendorCity',
        vendorZip: '.vendorZip',
        vendorNameMod: '.vendorNameMod',
        vendorEmailMod: '.vendorEmailMod',
        vendorPhoneMod: '.vendorPhoneMod',
        vendorAddressMod: '.vendorAddressMod',
        vendorCityMod: '.vendorCityMod',
        vendorZipMod: '.vendorZipMod',
        businessName: '.businessName',
        businessEmail: '.businessEmail',
        businessPhone: '.businessPhone',
        businessAddress: '.businessAddress',
        businessCity: '.businessCity',
        businessZip: '.businessZip',
        quantity: '.quantity',
        unitPrice: '.unitPrice',
        itemAmount: '.itemAmount',
        subtotal: '.subtotal',
        taxRate: '.taxRate',
        taxAmount: '.taxAmount',
        payments: '.payments',
        amountDue: '.amountDue',
        salesPersonInput: '.salesPersonInput',
        itemType: '.itemType',
        
        //Selects
        vendorsSelect: '.vendorsSelect',
        invoicesDue: '.invoicesDue',
        invoicesPaid: '.invoicesPaid',
        invoicesPastDue: '.invoicesPastDue',
        salesPersonSelect: '.salesPersonSelect',
        vendorState: '.vendorState',
        vendorStateMod: '.vendorStateMod',
        businessState: '.businessState',
        itemTypeSelect: '.itemTypeSelect',
        states: '.states',
        invoiceSelects: '.invoiceSelects',
        
        //TextAreas
        description: '.description',
        comments: '.comments',
        
        //Tables
        invoiceTable: '.invoiceTable',
        invTabHead: '.invTabHead',
        invTabBody: '.invTabBody',
        invTabRow: '.invTabBody tr',
        
        //Other
        invItemId: '.invItemId'
    }
    
    //Public Methods
    return {
        getSelectors: () => {
            return UISelectors;
        },
        getVendorModalInputs: () => {
            return {
                vendorName: document.querySelector(UISelectors.vendorNameMod).value,
                vendorEmail: document.querySelector(UISelectors.vendorEmailMod).value,
                vendorPhone: document.querySelector(UISelectors.vendorPhoneMod).value,
                vendorAddress: document.querySelector(UISelectors.vendorAddressMod).value,
                vendorCity: document.querySelector(UISelectors.vendorCityMod).value,
                vendorState: document.querySelector(UISelectors.vendorStateMod).value,
                vendorZip: document.querySelector(UISelectors.vendorZipMod).value
            }
        },
        getVendorInputs: () => {
            return {
                vendorName: document.querySelector(UISelectors.vendorName).value,
                vendorEmail: document.querySelector(UISelectors.vendorEmail).value,
                vendorPhone: document.querySelector(UISelectors.vendorPhone).value,
                vendorAddress: document.querySelector(UISelectors.vendorAddress).value,
                vendorCity: document.querySelector(UISelectors.vendorCity).value,
                vendorState: document.querySelector(UISelectors.vendorState).value,
                vendorZip: document.querySelector(UISelectors.vendorZip).value
            }
        },
        getBusinessInputs: ()=>{
            return {
                businessName: document.querySelector(UISelectors.businessName).value,
                businessEmail: document.querySelector(UISelectors.businessEmail).value,
                businessPhone: document.querySelector(UISelectors.businessPhone).value,
                businessAddress: document.querySelector(UISelectors.businessAddress).value,
                businessCity: document.querySelector(UISelectors.businessCity).value,
                businessState: document.querySelector(UISelectors.businessState).value,
                businessZip: document.querySelector(UISelectors.businessZip).value 
            }   
        },
        getItemInputs: () =>{
            const selectBox = document.querySelector(UISelectors.itemTypeSelect);
            const selectIndex = selectBox.options[selectBox.selectedIndex].value;

            return {
                itemType: selectIndex,
                description: document.querySelector(UISelectors.description).value,
                quantity: document.querySelector(UISelectors.quantity).value,
                unitPrice: document.querySelector(UISelectors.unitPrice).value,
                itemAmount: document.querySelector(UISelectors.itemAmount).value
            }    
        },
        getInvoiceInfo: ()=> {
            return {
                salesPerson: document.querySelector(UISelectors.salesPersonSelect).value,
                invoiceID: document.querySelector(UISelectors.invoiceId).value,
                issueDate: Date.parse(document.querySelector(UISelectors.issueDate).value),
                dueDate: Date.parse(document.querySelector(UISelectors.dueDate).value),
                subject: document.querySelector(UISelectors.invoiceSubject).value,
                comments: document.querySelector(UISelectors.comments).value,
                subtotal: document.querySelector(UISelectors.subtotal).value,
                taxRate: document.querySelector(UISelectors.taxRate).value,
                taxAmount: document.querySelector(UISelectors.taxAmount).value,
                payments: document.querySelector(UISelectors.payments).value,
                amountDue: parseFloat(document.querySelector(UISelectors.amountDue).value)
            }
        },
        displayVendor: (vendorData) =>{
            document.querySelector(UISelectors.vendorName).value = vendorData.vendorName,
            document.querySelector(UISelectors.vendorEmail).value = vendorData.vendorEmail,
            document.querySelector(UISelectors.vendorPhone).value = vendorData.vendorPhone,
            document.querySelector(UISelectors.vendorAddress).value = vendorData.vendorAddress,
            document.querySelector(UISelectors.vendorCity).value = vendorData.vendorCity,
            document.querySelector(UISelectors.vendorState).value = vendorData.vendorState,
            document.querySelector(UISelectors.vendorZip).value = vendorData.vendorZip
        },
        displayBusiness: (businessData)=>{
            document.querySelector(UISelectors.businessName).value = businessData.businessName,
            document.querySelector(UISelectors.businessEmail).value = businessData.businessEmail,
            document.querySelector(UISelectors.businessPhone).value = businessData.businessPhone,
            document.querySelector(UISelectors.businessAddress).value = businessData.businessAddress,
            document.querySelector(UISelectors.businessCity).value = businessData.businessCity,
            document.querySelector(UISelectors.businessState).value = businessData.businessState,
            document.querySelector(UISelectors.businessZip).value = businessData.businessZip
        },
        displayFoundItems:(retrievedItem)=>{
            document.querySelector(UISelectors.invItemId).value = retrievedItem.id;
            document.querySelector(UISelectors.itemType).value = retrievedItem.itemType;
            document.querySelector(UISelectors.description).value = retrievedItem.itemDescription;
            document.querySelector(UISelectors.quantity).value = retrievedItem.itemQuantity;
            document.querySelector(UISelectors.unitPrice).value = retrievedItem.itemUnitPrice;
            document.querySelector(UISelectors.itemAmount).value = retrievedItem.itemAmount;   
        },
        populateVendorSelects:(vendorData, selector) => {
            $(selector).find('option:gt(0)').remove();
            const mapVendors = vendorData.map(x=> x.vendorData.vendorName)
                .forEach((y, index)=> {
                    let option = document.createElement("option");
                        option.text = y;
                        option.value = index;
                        document.querySelector(selector).appendChild(option);
                });
        },
        populateEmployeeSelect:(employeeData, selector)=>{
            $(selector).find('option:gt(0)').remove();
            employeeData.forEach(emp=>{
                let option = document.createElement('option');
                option.text = emp.employeeInput;
                option.value = emp.employeeId;
                document.querySelector(selector).appendChild(option);
            });
        },
        populateItemTypeSelect:(data, selector)=>{
            $(selector).find('option:gt(0)').remove();
            data.forEach(datum=>{
                let option = document.createElement('option');
                option.text = datum.itemInput;
                option.value = datum.itemInput;
                document.querySelector(selector).appendChild(option);
            });
        },
        populateSelects: (invoices)=>{
            $(UISelectors.invoicesPaid).find('option:gt(0)').remove();
            $(UISelectors.invoicesPastDue).find('option:gt(0)').remove();
            $(UISelectors.invoicesDue).find('option:gt(0)').remove();
            
            const invoiceForEach = invoices.forEach(x=> {
                let vendorName = x.invoiceData.vendorTo[0].vendorName,
                    dueDate = new Date(x.invoiceData.dueDate),
                    option = document.createElement("option");
                if(x.invoiceData.status === 'Paid'){ 
                        
                        option.text = `Vendor: ${vendorName},  Date Due: ${dueDate.getMonth()+1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
                        option.value = `${x.invoiceID}`;
                        document.querySelector(UISelectors.invoicesPaid).appendChild(option);
                } else if(x.invoiceData.status === 'Past Due'){
                        option.text = `Vendor: ${vendorName},  Date Due: ${dueDate.getMonth()+1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
                        option.value = `${x.invoiceID}`;
                        document.querySelector(UISelectors.invoicesPastDue).appendChild(option);
                } else {
                        option.text = `Vendor: ${vendorName},  Date Due: ${dueDate.getMonth()+1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
                        option.value = `${x.invoiceID}`;
                        document.querySelector(UISelectors.invoicesDue).appendChild(option);
                }
            });
        },
        populateStateSelects: ()=>{    
            const statesSelect = Array.prototype.slice.call(document.querySelectorAll(UISelectors.states));
            statesSelect.forEach(select=>{
                USStates.forEach(state=>{
                    let option = document.createElement("option");
                    option.text = state;
                    option.value = state;
                    select.add(option);
                });
            });   
        },
        populateInputs: (retrievedInvoice)=>{
            let issueDate = new Date(retrievedInvoice.issueDate),
                dueDate = new Date(retrievedInvoice.dueDate);
            
            document.querySelector(UISelectors.salesPersonSelect).value = retrievedInvoice.salesPerson;
            document.querySelector(UISelectors.invoiceId).value = retrievedInvoice.invoiceId;
            document.querySelector(UISelectors.issueDate).value = `${issueDate.getMonth()+1}/${issueDate.getDate()}/${issueDate.getFullYear()}`;
            document.querySelector(UISelectors.dueDate).value = `${dueDate.getMonth()+1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
            document.querySelector(UISelectors.invoiceSubject).value = retrievedInvoice.subject;
            document.querySelector(UISelectors.comments).value = retrievedInvoice.comments;
            document.querySelector(UISelectors.subtotal).value = retrievedInvoice.subtotal;
            document.querySelector(UISelectors.taxRate).value = retrievedInvoice.taxRate;
            document.querySelector(UISelectors.taxAmount).value = retrievedInvoice.taxAmount;
            document.querySelector(UISelectors.payments).value = retrievedInvoice.payments;
            document.querySelector(UISelectors.amountDue).value = retrievedInvoice.amountDue;    
        },
        populateTableData: (tableData)=>{
            let html = '';

            if(tableData){
                tableData.forEach(x=> {
                    html += `
                        <tr id="item-${x.id}">
                        <td class="align-middle">${x.itemType}</td>
                        <td class="align-middle">${x.itemDescription}</td>
                        <td class="align-middle">${x.itemQuantity}</td>
                        <td class="align-middle">&dollar;${x.itemUnitPrice}</td>
                        <td class="align-middle">&dollar;${x.itemAmount}</td>
                        <td class="modifytd align-middle"><button class="btn btn-warning editInvoiceItem mr-2" type="button"><i class="far fa-edit h5 mb-0"> </i></button>
                        <button class="btn btn-danger deleteInvoiceItem" type="button"><i class="far fa-trash-alt h5 mb-0"></i></button></td>
                        </tr>`;    
                });

                document.querySelector(UISelectors.invTabBody).innerHTML = html;
            }   
        },
        displayNewItem: (newItem)=>{
            //Create table row element <tr>
           const tr = document.createElement('tr');
            
            //add id to tr
            tr.id = `item-${newItem.id}`;
            
            //add innerHTML to tr
            tr.innerHTML = `<td class="align-middle">${newItem.itemType}</td>
                            <td class="align-middle">${newItem.itemDescription}</td>
                            <td class="align-middle">${newItem.itemQuantity}</td>
                            <td class="align-middle">&dollar;${newItem.itemUnitPrice}</td>
                            <td class="align-middle">&dollar;${newItem.itemAmount}</td>
                            <td class="modifytd align-middle"><button class="btn btn-warning editInvoiceItem mr-2" type="button"><i class="far fa-edit h5 mb-0"> </i></button>
                            <button class="btn btn-danger deleteInvoiceItem" type="button"><i class="far fa-trash-alt h5 mb-0"></i></button></td>`;
            
            //Insert item
            document.querySelector(UISelectors.invTabBody).insertAdjacentElement('beforeend', tr);
        },
        displayUpdatedItem: (itemId, updatedItem)=>{

            let tableRows = document.querySelectorAll(UISelectors.invTabRow);
            
            tableRows = Array.from(tableRows);
            
            tableRows.forEach(row=> {
                let rowId = parseInt(row.id.split('-')[1]);
                
                if(rowId === itemId){
                    row.innerHTML = `
                                <td class="align-middle">${updatedItem.itemType}</td>
                                <td class="align-middle">${updatedItem.description}</td>
                                <td class="align-middle">${updatedItem.quantity}</td>
                                <td class="align-middle">&dollar;${updatedItem.unitPrice}</td>
                                <td class="align-middle">&dollar;${updatedItem.itemAmount}</td>
                                <td class="modifytd align-middle"><button class="btn btn-warning editInvoiceItem mr-2" type="button"><i class="far fa-edit h5 mb-0"> </i></button>
                                <button class="btn btn-danger deleteInvoiceItem" type="button"><i class="far fa-trash-alt h5 mb-0"></i></button></td>`;
                }
            }) 
        },
        showAlert: function(message, className, parent, child){
                //create div
                const newItem = document.createElement('div');

                //Add classes
                newItem.className = `alert ${className}`;

                //Add message text
                newItem.appendChild(document.createTextNode(message));
            
                //Get parent
                const parentElement = document.querySelector(parent);
                
                const childElement = document.querySelector(child);
                //Insert alert
                parentElement.insertBefore(newItem, childElement);

                //Timeout after 3 seconds
                setTimeout(function() {
                    document.querySelector('.alert').remove();
                }, 3000);
            
        }
        
    }

})($);


//==============STATE CONTROLLER=================
const StateCtrl = (function(){
    //Get UI selectors
    const UISelectors = UICtrl.getSelectors();
    
    //Public Methods
    return {
        
        displayVendorState: ()=> {
            document.querySelector(UISelectors.vendorName).disabled = true,
            document.querySelector(UISelectors.vendorAddress).disabled = true,
            document.querySelector(UISelectors.vendorEmail).disabled = true,
            document.querySelector(UISelectors.vendorPhone).disabled = true,
            document.querySelector(UISelectors.vendorCity).disabled = true,
            document.querySelector(UISelectors.vendorState).disabled = true,
            document.querySelector(UISelectors.vendorZip).disabled = true,
            document.querySelector(UISelectors.editVendor).style.display = 'block',
            document.querySelector(UISelectors.updateVendor).style.display = 'none',
            document.querySelector(UISelectors.backBtn).style.display = 'none'
        },
        editVendorState: ()=>{
            document.querySelector(UISelectors.vendorName).disabled = false,
            document.querySelector(UISelectors.vendorEmail).disabled = false,
            document.querySelector(UISelectors.vendorPhone).disabled = false,
            document.querySelector(UISelectors.vendorAddress).disabled = false,
            document.querySelector(UISelectors.vendorCity).disabled = false,
            document.querySelector(UISelectors.vendorState).disabled = false,
            document.querySelector(UISelectors.vendorZip).disabled = false,
            document.querySelector(UISelectors.editVendor).style.display = 'none',
            document.querySelector(UISelectors.updateVendor).style.display = 'block',
            document.querySelector(UISelectors.backBtn).style.display = 'block'
        },
        displayBusinessState: ()=> {
            document.querySelector(UISelectors.businessName).disabled = true,
            document.querySelector(UISelectors.businessAddress).disabled = true,
            document.querySelector(UISelectors.businessEmail).disabled = true,
            document.querySelector(UISelectors.businessPhone).disabled = true,
            document.querySelector(UISelectors.businessCity).disabled = true,
            document.querySelector(UISelectors.businessState).disabled = true,
            document.querySelector(UISelectors.businessZip).disabled = true,
            document.querySelector(UISelectors.editBusiness).style.display = 'block',
            document.querySelector(UISelectors.saveBusiness).style.display = 'none',
            document.querySelector(UISelectors.backBtn2).style.display = 'none'
        },
        editBusinessState: ()=> {
            document.querySelector(UISelectors.businessName).disabled = false,
            document.querySelector(UISelectors.businessAddress).disabled = false,
            document.querySelector(UISelectors.businessEmail).disabled = false,
            document.querySelector(UISelectors.businessPhone).disabled = false,
            document.querySelector(UISelectors.businessCity).disabled = false,
            document.querySelector(UISelectors.businessState).disabled = false,
            document.querySelector(UISelectors.businessZip).disabled = false,
            document.querySelector(UISelectors.editBusiness).style.display = 'none',
            document.querySelector(UISelectors.saveBusiness).style.display = 'block',
            document.querySelector(UISelectors.saveBusiness).classList = 'btn btn-success saveBusiness',
            document.querySelector(UISelectors.backBtn2).style.display = 'block'
        },
        initBusinessState: ()=> {
            document.querySelector(UISelectors.businessName).disabled = false,
            document.querySelector(UISelectors.businessAddress).disabled = false,
            document.querySelector(UISelectors.businessCity).disabled = false,
            document.querySelector(UISelectors.businessState).disabled = false,
            document.querySelector(UISelectors.businessZip).disabled = false,
            document.querySelector(UISelectors.editBusiness).style.display = 'none',
            document.querySelector(UISelectors.saveBusiness).style.display = 'block',
            document.querySelector(UISelectors.backBtn2).style.display = 'none'   
        },
        editItemState: ()=>{
            document.querySelector(UISelectors.updateItem).style.display = 'block';
            document.querySelector(UISelectors.backBtn3).style.display = 'block';
            document.querySelector(UISelectors.addNewItem).style.display = 'none';
        },
        displayItemState: ()=>{
            document.querySelector(UISelectors.updateItem).style.display = 'none';
            document.querySelector(UISelectors.backBtn3).style.display = 'none';
            document.querySelector(UISelectors.addNewItem).style.display = 'block';
        },
        
        clearItemInputs: ()=> {
            document.querySelector(UISelectors.itemType).selectedIndex = 0;
            document.querySelector(UISelectors.description).value = '',
            document.querySelector(UISelectors.quantity).value = '',
            document.querySelector(UISelectors.unitPrice).value = '',
            document.querySelector(UISelectors.itemAmount).value = ''
        },
        clearAllInputs: ()=>{
            Array.prototype.slice.call(
              document.getElementsByTagName('input'))
              .forEach(function (el) {
                el.value = '';
            });    
        },
        clearTableRows: ()=>{
            let table = document.querySelector(UISelectors.invoiceTable);
            
            while(table.rows.length > 1) {
                table.deleteRow(1);
            }
        }
    }

})();


//==============APP CONTROLLER=================
const AppCtrl = (function(StorageCtrl, ItemCtrl, UICtrl, StateCtrl, $){

    //Get UI selectors
    const UISelectors = UICtrl.getSelectors();
    
    const loadEventListeners = ()=>{
        /*----------------INPUT Events-----------------*/
        
        
        //Calculate Item Amount
        document.querySelector(UISelectors.quantity).addEventListener('input', calcItemAmount);
        document.querySelector(UISelectors.unitPrice).addEventListener('input', calcItemAmount);
        
        //Calculate Amounts
        document.querySelector(UISelectors.taxRate).addEventListener('input', calcAmounts);
        
        //Calculate Payments
        document.querySelector(UISelectors.payments).addEventListener('input', calcAmounts);
             
        /*----------------CLICK Events-----------------*/
        //Save Vendor
        document.querySelector(UISelectors.saveVendor).addEventListener('click', saveVendor);
        
        //Save Sales Person
        document.querySelector(UISelectors.saveSalesPerson).addEventListener('click', saveSalesPerson);
        
        //Save Business
        document.querySelector(UISelectors.saveBusiness).addEventListener('click', saveBusiness);
        
        //Save Invoice
        document.querySelector(UISelectors.saveInvoice).addEventListener('click', saveInvoice);
        
        //Save Item Type
        document.querySelector(UISelectors.saveItemType).addEventListener('click', saveItemType);
        
        //Update Vendor click
        document.querySelector(UISelectors.updateVendor).addEventListener('click', updateVendor);
        
        //Update Item click
        document.querySelector(UISelectors.updateItem).addEventListener('click', updateInvoiceItem);
        
        //Edit vendor click
        document.querySelector(UISelectors.editVendor).addEventListener('click', StateCtrl.editVendorState);
        
        //Edit business Click
        document.querySelector(UISelectors.editBusiness).addEventListener('click', StateCtrl.editBusinessState);
        
        //Edit item click
        document.querySelector(UISelectors.invTabBody).addEventListener('click', editInvoiceItem);
        
        //Update Invoice Click
        document.querySelector(UISelectors.updateInvoice).addEventListener('click', updateInvoice);
        
        //Add Item click
        document.querySelector(UISelectors.addNewItem).addEventListener('click', addItem);
        
        document.querySelector(UISelectors.backBtn3).addEventListener('click', ()=>{
            StateCtrl.displayItemState();
            StateCtrl.clearItemInputs();
            
        });
        
        //back btn click
        document.querySelector(UISelectors.backBtn2).addEventListener('click', StateCtrl.displayBusinessState);
        
        //back btn click
        document.querySelector(UISelectors.backBtn).addEventListener('click', StateCtrl.displayVendorState);

        document.querySelector(UISelectors.pdfView).addEventListener('click', createInvoicePdf);
        
        //New Invoice click
        document.querySelector(UISelectors.newInvoice).addEventListener('click', newInvoice);
   
        /*----------------CHANGE Events-----------------*/
        //Load vendor day on vendor select change
        document.querySelector(UISelectors.vendorsSelect).addEventListener('change', loadVendorData);
        
        //load past due invoice
        document.querySelector(UISelectors.invoicesPastDue).addEventListener('change', ()=>{
            document.querySelector(UISelectors.invoicesDue).selectedIndex = 0;
            document.querySelector(UISelectors.invoicesPaid).selectedIndex = 0;
            loadInvoiceData(UISelectors.invoicesPastDue);
        });
        
        //load invoices due
        document.querySelector(UISelectors.invoicesDue).addEventListener('change', ()=>{
            document.querySelector(UISelectors.invoicesPastDue).selectedIndex = 0;
            document.querySelector(UISelectors.invoicesPaid).selectedIndex = 0;
            loadInvoiceData(UISelectors.invoicesDue);
        });
        
        //load invoices Paid
        document.querySelector(UISelectors.invoicesPaid).addEventListener('change', ()=>{
            document.querySelector(UISelectors.invoicesPastDue).selectedIndex = 0;
            document.querySelector(UISelectors.invoicesDue).selectedIndex = 0;
            loadInvoiceData(UISelectors.invoicesPaid);
        });
    }
    
    const newInvoice = ()=> {
        //clear all input fields
        StateCtrl.clearAllInputs();
        
        //reset data structure
        ItemCtrl.resetDataStructure();
         
        //clear table rows
        StateCtrl.clearTableRows();
        
        loadBusinessData();

        loadInvoiceData();

        UICtrl.populateStateSelects();
        
        document.querySelector(UISelectors.updateInvoice).style.display = 'none';
        
        document.querySelector(UISelectors.saveInvoice).style.display = 'block';  
        
        document.querySelector(UISelectors.comments).value = '';

        
    }
    
    const addItem = ()=> {
        let addItem = 'invItem';
        
        //get input values from UI
        const itemInputs = UICtrl.getItemInputs();

        if(itemInputs.itemType !== '' && itemInputs.description !== '' && itemInputs.quantity !== '' && itemInputs.unitPrice !== ''){
            
            //Add Item to data structure
            const addItem = ItemCtrl.addItems(itemInputs);
            
            //Disply new item in ui
            UICtrl.displayNewItem(addItem);
            
            //Calculate subtotal
            const subTotal = ItemCtrl.calcSubtotal();
            
            //update UI subtotal
            document.querySelector(UISelectors.subtotal).value = subTotal;
            
            //clear item inputs
            StateCtrl.clearItemInputs();
            
            calcAmounts();
            
            UICtrl.showAlert("Invoice item Added", 'alert alert-success py-2 d-flex justify-content-center mb-0', '#parentAlert3', '#childAlert3');
            
        }else{

            UICtrl.showAlert("Please fill out all item fields", 'alert alert-warning py-2 d-flex justify-content-center mb-0', '#parentAlert3', '#childAlert3');
        }
        
    }
    
    const saveVendor = ()=>{
        let vendors = 'vendors';
        
        //get input values from UI
        const vendorInput = UICtrl.getVendorModalInputs();

        //Add Vendor Item
        const addVendor = ItemCtrl.addVendor(vendorInput);
        
        //Store Vendor Item in local storage
        StorageCtrl.storeVendor(addVendor);
        
        //Display vendor in UI
        UICtrl.displayVendor(addVendor);  
        
        //Populate vendors select box
        UICtrl.populateVendorSelects(StorageCtrl.getGenericFromStorage(vendors), UISelectors.vendorsSelect);
        
        StateCtrl.displayVendorState();
        
        UICtrl.showAlert("Vendor Saved", 'alert-success py-2 d-flex justify-content-center mt-5', '#parentAlert2', '#childAlert2');
    }
    
    const saveBusiness = ()=>{
        //get Business inputs
        const businessInputs = UICtrl.getBusinessInputs();

        //Add Business Item
        const addBusiness = ItemCtrl.addBusiness(businessInputs);
        
        //Update State
        StateCtrl.displayBusinessState();
        
         UICtrl.showAlert("Business Saved", 'alert-success py-2 d-flex justify-content-center mt-5', '#parentAlert2', '#childAlert2');
    }
    
    const saveInvoice = ()=> {
        //get vendor inputs
        const vendorInputs = UICtrl.getVendorInputs();
        //get Business inputs
        const businessInputs = UICtrl.getBusinessInputs();
        //get other invoice info
        const invoiceInfo = UICtrl.getInvoiceInfo();
        //add invoice to data structure
        const addInvoice = ItemCtrl.addInvoice(vendorInputs, businessInputs, invoiceInfo);
        //Load invoice data to populate select fields
        loadInvoiceData();
        
        UICtrl.showAlert("Invoice Saved", 'alert-success py-2', '#parentAlert1', '#childAlert1');
        
        newInvoice();
        
    }
    
    const saveSalesPerson = ()=> {
        let key = 'employee';
        
        const employeeInput = document.querySelector(UISelectors.salesPersonInput).value;
        
        StorageCtrl.storeEmployee(key, employeeInput);
        
        
        UICtrl.populateEmployeeSelect(StorageCtrl.getGenericFromStorage(key), UISelectors.salesPersonSelect);
    }
    
    const saveItemType = ()=> {
        let key = 'itemType';
        
        const itemTypeInput = document.querySelector(UISelectors.itemType).value;
        console.log(itemTypeInput);
        StorageCtrl.storeItemType(key, itemTypeInput);
        
        UICtrl.populateItemTypeSelect(StorageCtrl.getGenericFromStorage(key), UISelectors.itemTypeSelect);
    }
    
    const loadBusinessData = ()=>{
        let business = 'business';
        
        const retrievedData = StorageCtrl.getGenericFromStorage(business);
        
        if(retrievedData.id === 0){
            UICtrl.displayBusiness(retrievedData);
        
            StateCtrl.displayBusinessState();
        }else {
            StateCtrl.initBusinessState();
        }

    }
    
    const loadVendorData = ()=>{
        let vendors = 'vendors';
        
        const selectBox = document.querySelector(UISelectors.vendorsSelect);
        const selectIndex = parseInt(selectBox.options[selectBox.selectedIndex].value);
        
        //Retrieve Data
        const retrievedData = StorageCtrl.getGenericFromStorage(vendors);

        const filteredData = retrievedData.filter(x=> x.id === selectIndex)[0];

        UICtrl.displayVendor(filteredData.vendorData);
        
        document.querySelector(UISelectors.editVendor).style.display = 'block';
        
        StateCtrl.displayVendorState();   
    }
    
    const loadInvoiceData = (selector)=> {
        let invoices = 'invoices';
        const retrievedData = StorageCtrl.getGenericFromStorage(invoices);
        
        if(selector){
            const selectBox = document.querySelector(selector),
                  selectIndex = selectBox.options[selectBox.selectedIndex].value,
                  retrievedInvoice = retrievedData[selectIndex].invoiceData;
            
            
            
            //Populate Inputs
            UICtrl.populateInputs(retrievedInvoice);
            
            //Display Vendor
            UICtrl.displayVendor(retrievedInvoice.vendorTo[0]);
            
            //Populate table data
            UICtrl.populateTableData(retrievedInvoice.invoiceItems);
            
            //Add retrieved invoice back to data structure
            ItemCtrl.addRetrievedData(retrievedInvoice);
            
            document.querySelector(UISelectors.saveInvoice).style.display = 'none';
            document.querySelector(UISelectors.updateInvoice).style.display = 'block';
            
            calcAmounts();
            
        }else {

            ItemCtrl.updateInvoiceStatus(retrievedData);
            
            UICtrl.populateSelects(retrievedData);
        }
        
    }
    
    const updateVendor = ()=>{
        let key = 'vendors';
        
        //get select vendor value from selectbox
        const selectBox = document.querySelector(UISelectors.vendorsSelect);
        const selectIndex = selectBox.options[selectBox.selectedIndex].value;
        
        //get vendor inputs
        const vendorInputs = UICtrl.getVendorInputs();
        
        UICtrl.populateVendorSelects(StorageCtrl.getGenericFromStorage('vendors'), UISelectors.vendorsSelect);
        
        //update local storage
        StorageCtrl.updateVendorStorage(selectIndex, vendorInputs, key);
        
        StateCtrl.displayVendorState();
        
        UICtrl.showAlert("Vendor Updated", 'alert-success py-2 d-flex justify-content-center mt-5', '#parentAlert2', '#childAlert2');
        
    }
    
    const updateInvoiceItem = ()=>{
        const itemId = parseInt(document.querySelector(UISelectors.invItemId).value),
              invoiceId = getSelectInvoiceId(),
              key = 'invoices',
              updatedInputs = UICtrl.getItemInputs();
        
        if(ItemCtrl.retrieveInvoiceItems().length > 0){

            ItemCtrl.updateInvoiceItem(itemId, updatedInputs);
            
        }else{
        
            //Store Update inputs in local storage
            StorageCtrl.updateInvoiceItem(key, invoiceId, itemId, updatedInputs);
            
        }
        
        
       //Calculate subtotal
        const subTotal = ItemCtrl.calcSubtotal();

        //update UI subtotal
        document.querySelector(UISelectors.subtotal).value = subTotal;
        
        
        UICtrl.displayUpdatedItem(itemId, updatedInputs);
        
        //clear item inputs
        StateCtrl.clearItemInputs();
        
        StateCtrl.displayItemState();

        calcAmounts();
        
        UICtrl.showAlert("Invoice item Updated", 'alert alert-success py-2 d-flex justify-content-center mb-0', '#parentAlert3', '#childAlert3');
    }
    
    const updateInvoice = ()=>{
        let key = 'invoices';
        const selectedInvoiceId = getSelectInvoiceId();
        
        const retrieveItems = ItemCtrl.retrieveInvoiceItems();
        
        const vendorInputs = UICtrl.getVendorInputs();
        //get Business inputs
        const businessInputs = UICtrl.getBusinessInputs();
        //get other invoice info
        const invoiceInfo = UICtrl.getInvoiceInfo();
       
        StorageCtrl.updateInvoice(key, selectedInvoiceId, retrieveItems, vendorInputs, businessInputs, invoiceInfo);
        
        //Load invoice data to populate select fields
        loadInvoiceData();
        
        UICtrl.showAlert("Invoice Updated", 'alert-success py-2', '#parentAlert1', '#childAlert1');
        
        newInvoice();
        
        StateCtrl.initBusinessState();
        
    }
  
    const calcItemAmount = ()=> {
        let quantity = document.querySelector(UISelectors.quantity).value,
              unitPrice = document.querySelector(UISelectors.unitPrice).value,
              itemAmount;
            
        if(quantity !== "" && unitPrice !== ""){
            itemAmount = parseFloat((quantity * unitPrice).toFixed(2));
            document.querySelector(UISelectors.itemAmount).value = itemAmount;
        }else {
            document.querySelector(UISelectors.itemAmount).value = '';
        }
    }
    
    const calcAmounts = ()=>{
        let subTotal = parseFloat(document.querySelector(UISelectors.subtotal).value),
            taxRate = parseFloat(document.querySelector(UISelectors.taxRate).value),
            taxAmount = document.querySelector(UISelectors.taxAmount),
            payments = document.querySelector(UISelectors.payments).value,
            amountDue = document.querySelector(UISelectors.amountDue),
            totalDue;
        if(subTotal === '' || taxRate === ''){
            taxAmount.value = 0;
        } else if(taxRate < 1){    
            if(payments){
                totalDue = (subTotal + (subTotal * taxRate) - payments).toFixed(2);
                taxAmount.value = (subTotal * taxRate).toFixed(2);
                amountDue.value = Math.abs(totalDue);
            }else {
                totalDue = (subTotal + (subTotal * taxRate)).toFixed(2);
                taxAmount.value = (subTotal * taxRate).toFixed(2);
                amountDue.value = Math.abs(totalDue);
            }
            
        } else if(taxRate >= 1){
            if(payments){
                taxRate = taxRate/100;
                totalDue = (subTotal + (subTotal * taxRate) - payments).toFixed(2);
                taxAmount.value = (subTotal * taxRate).toFixed(2);
                amountDue.value = Math.abs(totalDue);
            }else{
                taxRate = taxRate/100;
                totalDue = (subTotal + (subTotal * taxRate)).toFixed(2);
                taxAmount.value = (subTotal * taxRate).toFixed(2);
                amountDue.value = Math.abs(totalDue);
            }
        }
    }
    
    const getSelectInvoiceId = ()=>{
        let selectIndex,
            invoiceId;
        
        //get select vendor value from selectbox
        const selectBoxes = Array.prototype.slice.call(document.querySelectorAll(UISelectors.invoiceSelects));

        selectBoxes.forEach(box=>{
            selectIndex = box.options[box.selectedIndex].value;
            if(selectIndex >= 0){
                invoiceId = parseInt(selectIndex);
            }
        });
        return invoiceId;
    }
    
    const editInvoiceItem = (e)=>{
        let parentId,
            itemId,
            invoiceId,
            key = 'invoices',
            retrievedStorage;
        
        invoiceId = getSelectInvoiceId();
        
        //get item id
        if(e.target.parentElement.classList.contains('fa-edit')){
            parentId = e.target.parentElement.parentElement.parentElement.parentElement.id;
        }else if(e.target.parentElement.classList.contains('editInvoiceItem')){
            parentId = e.target.parentElement.parentElement.parentElement.id;
        }else if(e.target.parentElement.classList.contains('modifytd')){
            parentId = e.target.parentElement.parentElement.id;
        }
        
        itemId = parseInt(parentId.split('-')[1]);
        
        //Retrieve Item data from either local storage or datastructure
        if(ItemCtrl.retrieveInvoiceItems().length > 0){
            retrievedStorage = ItemCtrl.retrieveInvoiceItems()[itemId];    
        }else {
            retrievedStorage = StorageCtrl.retrieveInvoiceItems(key, invoiceId, itemId);
        }

        UICtrl.displayFoundItems(retrievedStorage);
        
        StateCtrl.editItemState();
        
    }
    
    const createInvoicePdf = ()=>{
        
        const vendorInputs = UICtrl.getVendorInputs();
        
        const businessInputs = UICtrl.getBusinessInputs();
        
        const getInvoiceInfo = UICtrl.getInvoiceInfo();
        
        const invoiceItems = ItemCtrl.retrieveInvoiceItems();

        let invoiceDueDate = new Date(getInvoiceInfo.dueDate),
            invoiceIssueDate = new Date(getInvoiceInfo.issueDate),
            fileName;
        if(invoiceDueDate && vendorInputs.vendorName !== ''){
            fileName = `${vendorInputs.vendorName} Due ${invoiceDueDate.getMonth()+1}-${invoiceDueDate.getDate()}-${invoiceDueDate.getFullYear()}`;    
        }else{
            fileName = `pdf-file-name`;
        }
        
        
        
        let imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACfcAAA37CAYAAACs1F1tAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAIABJREFUeJzs3Wl8lfWdNvAfWQWSILJGFkVUUOKCrIIkLFbcta1aH+06auuuaN2lnVY7Veu4dIqP49jWpdPSOrVlqAoBNxYVQRAbXFCKIhAUEWWJBEJ4XsxTRy1K4Nzh3Anf78vknOtcRORDyHX+/xYjRozcEgAAAAAAAAAAAEBq5GS7AAAAAAAAAAAAAPBpxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAAAAAAAJAyxn0AAAAAAAAAAACQMsZ9AAAAAAAAAAAAkDLGfQAAAAAA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AEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAD78P0PAAAgAElEQVQAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJEbcBwAAAAAAAAAAAIkR9wEAAAAAAAAAAEBixH0AAAAAAAAAAACQGHEfAAAAAAAAAAAAJOYD92596b1KDwEAAAAAAAAAAAD8Oyf3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAk5gPvvffee5UeAgAAAAAAAAAAAPh3Tu4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASc3GlB4AL0S+PHIxV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AAAAAADvm17sAQAAAAAAAAAAAIBs4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABI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AAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsA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MeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMeY+AAAAAAAAAAAAiDH3AQAAAAAAAAAAQIy5DwAAAAAAAAAAAGLMfQAAAAAAAAAAABBj7gMAAAAAAAAAAIAYcx8AAAAAAAAAAADEmPsAAAAAAAAAAAAgxtwHAAAAAAAAAAAAMYfpAAAAAAD4FY/nazoBAAAAAPgSh+vtPt0AAAAAwJDL33k64acsyzKdAAAAAAB8id2yrtt0BAAAAAAzTsfjdAIAAAAAAB/stm0z9wEAAAAAAAAAAEDIfjoAAAAAAAAAAAAAeGfuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAPxMpj4AACAASURBVAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMSY+wAAAAAAAAAAACDG3AcAAAAAAAAAAAAx5j4AAAAAAAAAAACIMfcBAAAAAAAAAABAjLkPAAAAAAAAAAAAYsx9AAAAAAAAAAAAEGPuAwAAAAAAAAAAgBhzHwAAAAAAAAAAAMQcpgMAAAAA4Fc8nq/pBAAAAADgSxyut/t0AwAAAABDLn/n6YSfsizLdAIAAAAA8CV2y7pu0xEAAAAAzDgdj9MJAAAAAAB8sNu2zdwHAAAAAAAAAAAAIfvpAAAAAAAAAAAAAOCduQ8AAAAAAAAAAABizH0AAAAAAAAAAAAQY+4DAAAAAAAAAACAGHMfAAAAAAAAAAAAxJj7AAAAAAAAAAAAIMbcBwAAAAAAAAAAADHmPgAAAAAAAAAAAIgx9wEAAAAAAAAAAECMuQ8AAAAAAAAAAABizH0AAAAAAAAAAAAQY+4DAAAAAAAAAACAGHMfAAAAAAAAAAAAxJj7AAAAAAAAAAAAIMbcBwAAAAAAAAAAADHmPgAAAAAAAAAAAIgx9wEAAAAAAAAAAECMuQ8AAAAAAAAAAABizH0AAAAAAAAAAAAQY+4DAAAAAAAAAACAGHMfAAAAAAAAAAAAxJj7AAAAAAAAAAAAIMbcBwAAAAAAAAAAADHmPgAAAAAAAAAAAIgx9wEAAAAAAAAAAECMuQ8AAAAAAAAAAABizH0AAAAAAAAAAAAQY+4DAAAAAAAAAACAGHMfAAAAAAAAAAAAxJj7AAAAAAAAAAAAIMbcBwAAAAAAAAAAADHmPgAAAAAAAAAAAIgx9wEAAAAAAAAAAECMuQ8AAAAAAAAAAABizH0AAAAAAAAAAAAQY+4DAAAAAAAAAACAGHMfAAAAAAAAAAAAxJj7AAAAAAAAAAAAIMbcBwAAAAAAAAAAADHmPgAAAAAAAAAAAIgx9wEAAAAAAAAAAECMuQ8AAAAAAAAAAABizH0AAAAAAAAAAAAQY+4DAAAAAAAAAACAGHMfAAAAAAAAAP/s3MFJQwEURFEiwSxiTxLSuiiKPYi28BUSN9+lpIJ3Q86pYAq4DAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgRtwHAAAAAAAAAAAAMeI+AAAAAAAAAAAAiBH3AQAAAAAAAAAAQIy4DwAAAAAAAAAAAGLEfQAAAAAAAAAAABAj7gMAAAAAAAAAAIAYcR8AAAAAAAAAAADEiPsAAAAAAAAAAAAgZns+/05vAAAAAGDIbnc/PeGmfHx+TU8AAAAAAK7E9un5ZXoDAAAAAEOOh8fpCTdlWZbpCQAAAADAldicTud1egQAAAAAMzz3AQAAAAA0bdZ1FfcBAAAAAAAAAABAyN30AAAAAAAAAAAAAOCSuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAAAAAAAAAAADHiPgAAAAAAAAAAAIgR9wEAAAAAAAAAAECMuA8AAAAAAAAAAABixH0AAAAAAAAAAAAQI+4DAAAAAAAAAACAGHEfAAAAAAAAAAAAxIj7AAAAAAAAAAAAIEbcBwAA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R6re94De3kNV51euWj1i3LfjuR3x47a26OnuHvK3yhw2bTztls0AADAZTJnoCQAAAAAAAMBYXFCYVnW8t7Mzurr2TdBszkxX1764f+2/DQn7Btvb2RmPPfxI2mfq6+uLRx9+JDZv2jgk7BusXO6PzZs2xqMPPxKlUumszuGhBx6Mp9avHzbsO9Wutp3x6MOPRF9f31mdAwAAjBcr9wEAAAAAADApNDbOidrauujtPVQ5d//atbG0ZVm0LGtJu+Ldm8ePx1Pr11eCuKUty6J25syIiOjsfKUq+CuX++Oxhx+JP/uLP0+14txA2HdqVLeouTnq6xsiIqKnpztean9ny92e7u54fN03486776o8y0W1F8XKVasjonrFxNraulj6yU9WjmfPnj3sPGbW1sXezs4oFKbH0paWaF7cXPW7d3Xti00bNlTeaU93d2zcsCluuXXNe3l8AACYEOI+AAAAAAAAJo2Vq1fH4+u+UXVuV9vO2NW2MwqF6XFJc3M0NNRH0/ymKBaLEzTLagNBXH1DQ/z+HbdXzat1RWt07OmIb61bV4n/yuX+dEHaxg2bqsK+2tq6uO2O24cElV1d+6pW1js1risWi9G6ojUiquO+C2deVDl/Otddf20cL/fHjTffNGz82Ng4J+65795Y+y//WpnDrradtucFAGBSsi0vAAAAAAAAk8ally2Jz99007B/K5f7Y1fbznhq/fr45699Pb7+1X+K7z/9g7O+Ney7Ud/QEHfefdewweGChQviD+64o+rcrradKeYdEVEqlWJX287KcaEwfdiwL+JkXHfn3XdFoTC9cu5sPkuxWIwvfvlLo4Z611x3fdVx5yuvnpXvBwCA8STuAwAAAAAAYFJZftXy+NOvfCWWtiw77bje3kOxfeuz8c9f+3p8/+kfRF9f3zjNcKhVq284bZC2YOGCIc/T+UrnCKPHV9vO56uOr7722tNugVxTUxMrV6867T3OtemFQtVx76FDI4wEAIC8bMsLAAAAAADApNPYOCcaG+fE6htWRfvu9uju7omX29srW9ueavvWZ2Nv5ytx5913jfv2rPUNDbFg4YJRxy1ZvLhqhbzu7p4hYx564MExfec999079gmOoqd7f9Vxy5Uto17TvLg5nlq/fsR7nA0dezpi//6h9509e/ZZ/y4AAJgI4j4AAAAAAAAmrZqamlh+1fKTB7euia6ufdHZ8Ursev756O2tXq2tp7s7tj67LT77uc+M6xwvmDZtTONODQAP9w5dbW5v5/iv5neg5/XK59raujHFkTU1NVHf0BA93d0RcXbnveWZLcP+vgAA8H4j7gMAAAAAAOB9Y2BFv9YVrdGxpyO+tW5d1Wp+u9raxj3um+wGv78LZ1405uvGGjWeie98+4mq1Q1ra+viY01NUTtzZkRE9B4+HAd6uitRIQAATGbiPgAAAAAAAN6XFixcEH90911x/9q1lXPlcn907OkY0za5462vr2/UMStXrR6HmVSrra2rrJI3eBW/0Zy64t97teWZLVVh38pVq6N1ReuwY3/6wovx+LpvvOfvBACAiSTuAwAAAAAAYNLo6+sb07awAxob58Tcpqazui3s0cNHzmj8m8ePj2lc++72quP6htlDxowUs51Ls+ovrsR95XJ/lEqlKBaLp72mVCpVrfg3q/7i9zyPXc8/X/m8tGXZad/F9ELhPX8fAABMtCkTPQEAAAAAAAAYqye/uz62PLPljK4Za1wXMXq4t+WZLZXQbax6urujVCqNOu7HbW1Vxw0NDWf0PedK0/z5Vcdbn9026jWnjjn1Hu/G4Pc+sA0vAAC8n4n7AAAAAAAAmBR++sKL8VJ7e2zetDEeeuDB+OkLL456Tceejujp7q4cFwrTh2zJO7epqfK5t/dQdOzpGPZeXV37Yvu20cO24Ty+7pun3Xb3O99+omqetbV1cellS97Vd51tzYubo1CYXjne1bYzdjy3Y8TxO57bUbV9bqEwPZoXN5/2O84kwIyIKI8y/sXdu8/ofgAAkNF5f/23f/f3Ez0JAAAAAAAAGM1/PPpYlMvliIg4cvhw/Kx9d7yw6ydx5Ogb0d9fjmNH34jeQ73Re6g39u/vju0/3B4/ePp7VfdYcvnlsWjRJVXnDhw4GPtee61yfPDgwZg7b17MmDEjIk5uBbx92/b43pNPRrncH7W1dZV5vHn8zfjYvHlx4YUXVt1z1493xZHDhyvHx44di5fafxYzan4rZs36aOV8qVSK9U98N1584SdV13/+ppurxp1tv9j7i3h10FbFl12+NOo+XDfs2KlTp8ZvfvO/VeP/++c/jylTzoviR4oxderUiHjnPW14+umq63/v05+OhZ9YOOS+/7l5c+XzsWPHKvc7cOCXsf2H/xUXTJtW9V5//vLLcezYsYiI+J+DpWHfe8TJ1RW3b9tade5ERMxpbKz8phFDf6MpU86LufPmRl9fXxw48Mth7w0AAOPpQ28cf/PERE8CAAAAAAAATqevry/aftQWmzdtfNf3qG9oiDvvvitqamqqznd17Yv7164ddvwF06bF3kFRW31DQ1xz3fXx+LpvVM7NbWqKe+67t+rahx54sHLdoubm2Nv5apTL/RFxciW7WfUXx9HDR4bd4ndpy7K45dY17/o5x2LLM1uq3uUf3/0nQ1Y0PNV3vv1E1Yp8AwZWPhz8ngac7lkGv6PhrFy1OlpXtFaOdzy3I55av75yXChMj6UtLVFbOzPK/eUoHz8eL7e3R2/voSgUpsfcpnnxUnv7iPcb6XkGnunU3xQAAMbb+RM9AQAAAAAAABhNTU1NtK5ojeYlzbH12W0jRlkjmdvUFLf/4R1Dwr6IiMbGOXH1ddfH9q3PVp0fvE1uxDtx4Ovdr5/Rd9fXN8SyZVfGt9ati3K5P8rl/hGjtvEI+96tW25dE4VCYch7GulZrr7u+vjs5z4z4v1all152rivp6f6/S+/anl0d/dUfvtyuX/IXCJObml82x23R2fHK1Vx36mWLF484v/R0cNHRrwOAADGi215AQAAAAAAmDRmzJgRixZdEksuuzRqan47TkRUba06WKEwPT7+iYWx/FOfii/cdGNl+9jhLPj4gpgy5byqrWcH1NbWxcrVq2PNrbfE1KlTo+7DdXHk6Bvx+v/HZzNra2PpFVdUXTN4y9d5TfPjipYr4pLfXRRvvf2bynWDzW1qiptuXhPXXHfNWF/Fe3Im2/IOtuDjC6Kx8XfirbffjtLBg8OOWdTcHGtuuy0+2XLFsH8fMGvWR2PKlPPi9Z7X49e/frtyvlCYHksuvzyWLh06p0WLLhn2moiTv9PV114XX7j5xigWi1H8SDFe7eysbOU7r2l+zJ03tzK+7sN1MaOmJva91jXkXnObmmLJpUtGfR8AAHAu2ZYXAAAAAACASa+vr69qRb2Lai+KYrF4Tu9TKpXiSO+RUbezPVdzzaBjT0fV8Zm+i+HuM9Z7dHXtizfLxyMi4oLCtGhsnDPiuIgY8e+Dv///2Lv34KrrO3/8rxOcwVAGNRAvROIFg98FRKWGi6wXVgQrS73hva23tW7tt63aWu26q9jdbrU3pfv12uKlrWAFFZfFAsXGy6JgFBUDHYhoDQargaj5USIzwvn9ETnkkHtyyDmBx2PGmfP5nPfn9XmdTxJmzDzzerdWBwAAuptwHwAAAAAAAAAAAOSYvGw3AAAAAAAAAAAAAKQT7gMAAAAAAAAAAIAcI9wHAAAAAAAAAAAAOUa4DwAAAAAAAAAAAHKMcB8AAAAAAAAAAADkGOE+AAAAAAAAAAAAyDHCfQAAAAAAAAAAAJBjhPsAAAAAAAAAAAAgxwj3AQAAAAAAAAAAQI4R7gMAAAAAAAAAAIAcI9wHAAAAAAAAAAAAOUa4DwAAAAAAAAAAAHKMcB8AAAAAAAAAAADkGOE+AAAAAAAAAAAAyDHCfQAAAAAAAAAAAJBjhPsAAAAAAAAAAAAgxwj3AQAAAAAAAAAAQI4R7gMAAAAAAAAAAIAcI9wHAAAAAAAAAAAAOUa4DwAAAAAAAAAAAHKMcB8AAAAAAAAAAADkGOE+AAAAAAAAAAAAyDHCfQAAAAAAAAAAAJBjhPsAAAAAAAAAAAAgxwj3AQAAAAAAAAAAQI4R7gMAAAAAAAAAAIAcI9wHAAAAAAAAAAAAOUa4DwAAAAAAAAAAAHKMcB8AAAAAAAAAAADkmL2y3QAAAAAAAADpNtRsyHYLAADQaQMKB2S7BdgtCPcBAAAAAADkmLcrK7PdAgAAdJpwH2SGcB8AAAAAAECO2a9//2y3AAAAQJYl6j7dksx2EwAAAAAAAAAAAMAOedluAAAAAAAAAAAAAEgn3AcAAAAAAAAAAAA5RrgPAAAAAAAAAAAAcoxwHwAAAAAAAAAAAOQY4T4AAAAAAAAAAADIMcJ9AAAAAAAAAAAAkGOE+wAAAAAAAAAAACDHCPcBAAAAAAAAAABAjhHuAwAAAAAAAAAAgBwj3AcAAAAAAAAAAAA5RrgPAAAAAAAAAAAAcoxwHwAAAAAAAAAAAOQY4T4AAAAAAAAAAADIMcJ9AAAAAAAAAAAAkGOE+wAAAAAAAAAAACDHCPcBAAAAAAAAAABAjhHuAwAAAAAAAAAAgBwj3AcAAAAAAAAAAAA5RrgPAAAAAAAAAAAAcoxwHwAAAAAAAAAAAOQY4T4AAAAAAAAAAADIMXtluwEAdk+33zotHpszp8n5f7riivjGNddmoSMAAAAAAAAAgJ7D5D4AAAAAAAAAAADIMcJ9AAAAAAAAAAAAkGOE+wAAAAAAAAAAACDHCPcBAAAAAAAAAABAjhHuAwAAAAAAAAAAgBwj3AcAAAAAAAAAAAA5RrgPAAAAAAAAAAAAckyi7tMtyWw3AUDPt2rFipj35BPx1/ffj+eXLGl17aCiohg7dmwMHzEiJp91djd1CAAAAAAAAADQcwj3AdAl99x5RyxcsCDWVVd36vr+BfvFWWedHd+45toMdwYAAAAAAAAA0HMJ9wHQKfOffCJ+dd99nQ717WxQUVFcf+ONMe7k8RmpBwAAAACwu6uqWheLFiyI4UcdFWPGjsl2Oz3Gpk2bouLNini1vDwuufyy6Nu3b7ZbAgCAZgn3AdBht986LR6bM2eX1P7uddfFRZddvktqAwAAAEBPV7m6Mt57772M1Rt/Ss/6Y9s3Xl8RtRs3po6HjxgehYWFHa6z9KWlUb+5PnVcOrq0Rwa8fn3/r+KdtWsjImLo8OFx8Ve/kuWOMqOmpiaef+6F+MvatVFbuzEKCvrH3w0fHqWjjmv313vpS0tjYFFRFBcPavLeXb/8r1j/+R+uT5g4qcf9HAAAsOfYK9sNANCz7MpgX0TEz3/xi/jkk09s0wsAAAAAzXjvvfdi8aKFGavX00JN9fWb0z5//aefxumTv9ShGps2bYp5c+emjgsK+u+y53DTDTemXh82eHD809evzFjtytWVqWBfRMTE0yZlrHY2Va6ujN/PmhX19ZtT52prN8aS55+L5eXl8bXLL2s2sNdYVdW61Nf4vAsviqOPGZH2/t+feFI8NmtmREQsXrSw0yFRAADY1fKy3QAAPceuDvZt9+sZM2LJs2W7/D4AAAAAQM8yZuyYyM/vkzpeXl7e4Rrly9KvGXnccV3uKxv+u1FAcWTpqN0inFZTU5MK9g0sKoprvvfd+NHtt8Wll18RA4uKor5+c/zmgQdj06ZNLdbYtGlTzJ71aEREDCwqisFHHN5kzdHHjIjDBg9OHT//3AuZ/zAAAJABJvcB0C6rVqzolmDfdrfecnMs8gsVAAAAAEiT3yc/LZS0s08++jhqa3dsWzuwqCh67713d7TWbUaWlsaS55+LiIZJfm+8vqLJZLbWrFpZkXZcOro0o/11h6UvLU37Op940glZ7CZzyl9+JTWx77wLL0gFFkuOLIne+XvHfXfdFfX1m6N8WXmL0xYfnTkrams3Rn5+nzjvwgta3G75pJNOTk0+XF7+cpx40gm7RUASAIDdi3AfAO3yH9NuaffaE8eNiyH/5/802Vr39lunxUsvvRTrqqvbrLGx9qO4/dZpccMt0zraKgAAAADstsaMHRNjxo5p8f2yZ8rStq2dOOm0KDmypDta6zalo45LhfsiIirebH+4r6pqXaxv9PvJkaWjWgx/5bKKN99Mvd5dpvZFRKyvfi8iGkKpO3+m4uJBUVDQP2prN8batW81G+4re6Ys3lm7NvLz+8TXLr+s1edScmRJql5Ew/S+c6aencFPAwAAXWdbXgDatOTZslhdWdnmuv4F+8UPf/jDuOPe+5oE+yIibrhlWsxdsDDOmzq1XfedN39+fLC+7SAgAAAAALDnKCwsTJteuKqiImpqatp1bcWb6VP7Rhx1VEZ76w5VVetSE+cieuZn2BUqV1emgq0TJk2M4uJBbV7TeEvmP1dUtLrdLwAAZIPJfdAD/XH+/Hj66fmdvr540KA4fPARERFxxrnnZqotdmN/mP8/ba7Jz8+PO//rrhg6ou2/kN0+ja+tbX7r6+vjicceazYoCAAAAABkVk1NTVSsqIj6Tz9tNEHt4Mjfe+8YPmJ4q1PQ3nh9RdRu3LFNbFvrIxqmrDXWeBJbVdW62FL/aUREHFR0UJPpesOPOiot4FaxoqLFbVobW15ennpdUNC/1amGnX0e26/b2ScffZz2mQ8++OBOTVUsf7n9n6EyuwXoAAAgAElEQVSnGVh0cLyzdm2sr66OmpqatGdcuboyNWVvYNHBadfV1NTE72fNioiICRMntTrdsrHS0aWpQGB9/eaoeLOi3dcCAEB3EO6DPVDVunVRtW5dREQ8+2xZDCkZEiOOPjrGjW/7Fx/smXb+a9bmTJk8uV3Bvu1uuKV9W/Quf/WVdtcEAAAAADpu6UtL49Xy8rTtarfbHqBbvGhhjCwdFZNOm9jsNraDjzg85s2dG/X1myMiYu3at+Kfvn5li/fcefvgKWeemfb+ogULUve+9PIrmgTYxowdE4sXLkrdb/krr7QZ7nvj9RWp9RHpU9sa6+rz+Lj247TPtl1t7ca08xMmTupUMO/PFTt+X/t3w4d3+PpcVjrquFheXh719ZvjsVmPxnkXXhCFhYVRuboyFi1cEBER+fl9onRU+tfusVmPRn395hhZOqpdIc/t+vbtG4cNHpz6uq596y3hPgAAcopteYFYU7km5syZHT+edkusWbUy2+2QYz5YX91mAC8i4tIrW/5FXUuuvOqqNtf8efWaDtcFAAAAANrn1/f/KubNndtskG1ny8tfjocfeLDZrUv79u2bFtB7Z+3aJpP5tquqWpcWchtZOqpTgaqRpaWp17W1G6Oqal2r6yveXJF2XDq6tMmaTD2PXaWqal1aQLGoqKjb7t0dCgsL4/wLL4z8/D6xvro67vzZz+OmG26Mhx6YEeurqyM/v0987fLL0ib6PT3/D7G+ujoGFhXFpNMmdviegz/f6SiiYYtnAADIJSb3wW7g5JPHd2h73T/Onx+bN2+O5ctfjbq6utT5D2tq4p677ooxo0fH+V+7ZFe0Sg/01pq2w3WDiorigIEd/yXS5LPOjh//+MdRX1/f4pr6+vpY8mxZjDvZZEkAAAAAyLT9CvrHO2vXRn5+nxhZWhrDjxoexcWDUu9XVa1Lm6K3vro6Fi5YFOdMPbtJraOPGRHV1dWx5PnnIqJhut3gkiPS6kVEzJs7N/W6oKB/pwJZEQ1T3rbfK6Jhu9qd77Xdpk2b0oJbI0tHNTuBMBPPY9+CfWPCxEkREWkhxoKC/mnTAg8+OH1r2fZYW/lW2vHRx7R/N5WeouTIkrjqm9+I5597If66vjoV3Dts8BFROuq4tGDf0peWxpLnn4v8/D5xyeWXNfs1bcvOX4fK1ZW71VbHAAD0bMJ9sAc6dfLkiIg449xzY82qlfHMoj/GmsodAa6ly5bF+vXr4/KvXxX7FBRkq01yxMcffdTmmsMOPbTT9UtHjoznlyxpdc2K118X7gMAAACAXeDEk06IT+s3xxlnndlsMKq4eFD809evjLt++V+paXbLy19ucXve0yd/Kd5Z+1Zq7exZj8ZV3/xGau32KWvbnXvhBZ0KZEU0THlrvKXqnysqIpoJHUZElC8rTzsecdRRza7LxPMoLCxMbQ3bONy3z377dmjL2ObUf/pp6vXA3WxqX2OFhYXNBkgbq6paF4sXLkpN8+vs99HOQb733ntPuA8AgJxhW17Yww0ZOiy+cc01MXXqudG7d+/U+ap16+LuX06PT2prs9gde4IDDzqozTV1n3zSDZ0AAAAAwJ6nsLAwLv7qV9oMRv39iSelHa996+0W104588zIz+8TEQ3b5S5csCgiGiaiNZ60N2HipBYn7f3T16+MH91+W/zo9ttaDVoNbxTSq6/fHEtfWtrsulUrd0ztKyjo32LNXfE8Mml99Xup17333rtb7pmLNm3aFPPmzo36+s0xYdLEFr+P2mv79ysAAOQa4T4gIiLGjR8f377m2ti/0Tj7D2tqYuZvfpPFrtgTDCoubnPNX99/vxs6AQAAAABa0ic/P+24duPGFtcWFw+KCZN2bLW7vPzlWPrS0vj9rFmpc4cNHtzlKXYREWPGjkkLZq19660ma6qq1qVNC2y8NW5ndeR5kHlPPTk31ldXx4SJk2LM2DFdrnfgwLb/CB0AALLBtrxAysDi4rj629+Ju385PT6sqYmIiDWVa+Kp2bPjjHPPzXJ3ZMthg49oc807f/lLp+vvs+++nb4WAAAAAMicytWV8d577zU5f/DBB3e41pixY6K6en0sL385IiLmzZ2bei8/v09ccNGFnW90JyNLS1MTAVdVVERNTU0UNvpD9oo3K9LWl44ubVfdTD4PMufxOU/EqoqKGDp8eEYCohERn3z0cUbqAABApgn3AWn2KSiISy6/In555x2xZcuWiIh49tmyKB09Oga2Y8Iau5+hI0ZEfn5+1NfXt7hmXXV1rFqxIoaOGNHh+ocNPiLOmzq11TXtme4HAAAAAHRO2TNlsfyVV6K2NrPT5yadNjH+snZtk7rnX3hhm9vedkTpqOPStvutWFGRFvpaXl6eej2ydFSb995VzyMTBhYdHO+sXRsREVs+/TTL3XS/pS8tjeXlL8fAoqI446wz096rqamJihU7gpyDS45o93a9ufi1BgCACOE+oBkDi4tjypQvx5w5s1Pnfj/zkbj2xh9ksSuyqfjgg2N1ZWWra351911xx733dbj20BEjOhUKBAAAAAC67vE5T6Sm60VEFBT0j0MHD46C/faLiIjajz6Kv66vTtvWtr369u0bI487LhYvWphWv+TIkq433khhYWEcNnhwKvS2/JVXUuG+N15fEfX1m1NrRxx1VKu1duXzyIT8vfdOvc5WD9lSuboy5s2dG/n5fWLKmWemhTTLnilL+z6LiFi8aGEMLCqKKWee2WrIr6pqXdqxyYwAAOQS4T6gWePGj4+Xly2NqnUN/1NbtW5dvPbyy3HsqFFZ7oxsOProo9sM9z2/ZEncc+cd8Y1rru2mrgAAAACArih7piwtyDZh4qQWtzl94/UV8dismR2qX1W1rkngqrZ2Yzw9/w9x+uQvdbzhVgw/6qhUuK+2dmNUVa2L4uJBUfHmitSatoKFu/p5ZMLOwbPK1ZUZD0vmoqqqdfH7WbMiImLCpIlpYb2n5/8hNbnxsMGDY/hRR0Vt7UexvLw81ldXx28eeDCu+d51LU5sXFv5VtrxQUUH7aJPAQAAHSfcB7Ro8pe/HPfcdVfq+PXXlu8x4b71VVVRvmxZvL32rVTAcbt+/frFyJFfjAEDBsS48c3/Ymd3c+mVV8a8+fNb3Zo3IuLXM2ZE3SefxA23TOuexgAAAACATlv+yiup1yNLR7UYZIuI6JOf36HamzZtitmzHk0d5+f3SU3QW/L8c1FUVBRHH5O5HT3GjB0TixcuSt2j/OXyKCjYL1ZV7NimdeRxx7VaY1c+j0wpObIk7VlWvvXWbh/u2/69VF+/OUaWjooxY8ek3qupqUkF+4YOHx4Xf/UrqfeGHzU87rvrrqiv3xwLFyyKc6ae3Wz99et3TEA8bPDgjG4ZDQAAXSXcB7RoyNBhUTxoUCrctmLFiviktjb2KShod40/zp8fTz89P3V8+umT49TJk7vc2y0/uDHq6uoioiFsd+uPb+tyzYiINatWxvz//u8mgb7G6urq4tlnyyIiYt68/45TTpnQ5c/01OzZqZpDSobEN665pkv1Mu2AgUUxZfLkeGzOnDbXPjZnTrzxxhvxzW9/O8advGeEHwEAAACgJ6qt3Zh6vX3b2Ux56sm5qfr5+X3iqm9+I556cm5qut68uXNj8BGHZzRINbK0NBX0+nNFRZPPVDq6tNXrd+XzyKS/Gz48NWHwzxUVGZ+CmGsefuDBqK3dGAOLipoE9CpW7AhvTjxtUtp7xcWDYujw4bGqoiL+XFER0Uy4r6amJi0AOryNbZsBAKC75WW7ASC3HT74iLTjijfeyFInu97vf/Nw3HPXXa0G+3a2ZcuWePrp+XHHbT+OT2prO3XfJWVlqWBfRMSayjXx1OzZnaq1K91wy7ToX9C+X2itrqyMb3/rW3HlVy+O+U8+sYs7AwAAAAC6qv7TT1t9f8Wbb7a7VtkzZWmBqSlnnhmFhYVxwUUXRn5+n4b71W+OR2fOarFGVdW6qFxdGZWrK2PTpk3tum/pqB2T+errN6dtCTyydFSHgoSZfB7bbWmjZnudeNIJqde1tRtj6UtLM1I3Fz0+54lYX10d+fl94rwLL2h1bWFhYZNzAwcWRUSkJh3urHE4MD+/Tww/angXugUAgMwT7gNaVTp6dNrxmjWrs9TJrvNJbW3ccduPY+myZWnnh5QMiZNPHh933HV32n+nnz45hpQMSVtbtW5d/OKnP+lUwG/Dhg1Nzr299q0O1+kOt9z6w8jvwHYTy19/I26++eY487RJcfut03ZdYwAAAABAhw0sKkq9Xl5eHlVVzf/hc9kzZalJcdutXftW1NTUNFlbVbUulrzwQup4ZOmo1Pa7ffv2jfMvvDD13jtr10bZM2VNakRELFqwIB56YEY89MCMeL/6/XZ9nsLCwjhs8OBm3xvRjolsu+J5NLa+ujrKnimLTZs2RVXVunh6/h9avEdrdv6cFZ0IGvYEjZ/z+Rde2Gx4r7HmnuWqlQ3hvYKC/k3e27Rp007fq6W25AUAIOfYlhdo1cDi4ujdu3ds2bIlIiL++n77fonSk9z9y+nxYaNfuuxfWBjnnHdeDBk6rNn1p06eHKdGwxa+j/z2t6ntgevq6uLuX06PH0y7tUP379OnT5NzAwcO7FCN7jLu5PFx+09+Ejd8//tRX1/f7uvWVVfHujlz4rE5c+LEceNiwqRJMfmsplsgAAAAAADd54ulpbG+ujoiGiab/eaBB2NkaWkUFOwX9Zvro/7TT+PPFRVRW7sx8vP7xGGDD09N5Htn7dqoWFER408Zn6q3adOmmDd3bmpKWkFB/5h02sS0e5YcWRLjTjwptX3u4kUL4+CDD46SI0sy8pmGH3VUauvf7QoK+rerfqafR0TEYYMHp/WzeNHCtImC+XvvHcXFgzr8OU866eRU3XfWro3K1ZUZe4a5YOlLS1PPacLESS1+ttLRpbHkhReivn5zzJs7Ny65/LJUQG/pS0tTX8+Rxx3X5NryZeVpE/0aT34EAIBcYXIf0KZDig9Jvf6wjb887GnuufPOtM9UPGhQ/GDarS0G+xobMnRYXHf992P/Rn8t+GFNTfz+Nw93qIdTJ0+OMY0mJA4pGRKn/eOUDtXoTtsDfu3dondnzy9Zkprmd8+dd2S4OwAAAACgvcaMHRMjS0eljuvrN8eS55+LeXPnxuJFC2PJ889Fbe3GKCjoH1+7/LLUFqctWbhgUSpMFRFx7oUXNDsJ7fTJX0qbkvf7WbPavfVuW8aMHZPa+ne75oJdLV2byecREVE6anSr769fX93q+y0pObIkbXrfooULOlUnF23atCkWL1wUERFDhw9vEphsrG/fvjFhUkOAdH11ddx31z3x9Pw/xCO//V3Mmzs3IhomMu5cY+epfRMmTmpzMiAAAGSDcB/QpoKdQlzrq6qy1ElmLSkrizWVa1LH+xcWxrU3/qBDNfYpKIhLLr8ievfunTq3dNmyDj+j8792SWrb329cc03sU1DQoeu727iTx8dvZz0aI485utM11lVXx69nzIiJJ50g5AcAAAAAWXLO1LNjwsRJTQJxEQ0T7yZMnBRXffMbUVw8KEpHl6aF8hpb+tLStK1qJ0yc1OpEuvMuvCB1z/r6zfHozFld/CQ7jDvhhLTj0tGl7b42U89ju6OPGdFsvfz8PjGydFSMaiP815ozzjoz9Xp9dXUsfWlpp2vlku2BvYKC/mmfsSVjxo6J8y68KAoK+kdt7cZY8vxzqYmK4048KS65/LIm1zz/3AupqX35+X069D0CAADdKVH36ZZktpsAOuaP8+fH00/PTx2ffPL4OOPcc3fZ/Z6aPTuefbYsdfy1Sy6NY0eNauWKHXbu9fTTJ8epkyd3uadbfnBjajvcfv36xa0/vq1LNXr37h3fvubaGFhc3Kl+dv6cI0aMiMuu+udO1epp5j/5RPzqvvtiXXXn/sJ0uyNLSuJfp90aQ0eMyFBnAAAAAEBHVFWtiy31n0ZERO/8lreLrapaFxHRqe1ke5JMP4/K1ZWp15naQrfsmbJYvGhhQ/Bw0qQ4+pjd5/ermzZtanbyY2saf80OKjqoxevLnilLbec75cwzY8zYMV3uFwAAdoW9st0AQDY8NXt2KtgXETF27PGdDvZFNGyt+0r5y6ktflevXh2f1Nbm/AS+TJh81tkx+ayzY/6TT8Qjv/1trK6sbPuiZqyurIyvXnxRfPe66+Kiyy7PcJcAAAAAQFvaG9bb3UN922X6eWQq0NdY6ejSyO+Tv1uG0zoa7Ito/9di/Cnjo3R0aVS8WbFbPjsAAHYftuUF9kjLl7+aet27d+84+ZRTulzzuNId0wy3bNkSFW+80eWaPcnks86OmU88Gb99ZGacN3Vqp+v8/Be/iNtvnZa5xgAAAAAAdlN9+/YVTuskzw4AgJ5AuA/Y46xZtTJtat+xxxyTkQl7o8aOTTt+b11Vl2v2RENHjIgbbpkWr75ZEd+97ro4cdy4Dtd4bM4cAT8AAAAAAAAAYI8m3AfscV575ZW042OPOy4jdfcpKIj9CwtTx2+//XZG6vZkF112edxx733x6psVcd7UqdG/YL92X/vYnDkx88EHdmF3AAAAAAAAAAC5S7gP2OM0Dt317t07hgwdlrHa++67I7z2SaPpgETccMu0WPTcCx3asvehhx6MD9ZX78KuAAAAAAAAAAByk3AfsMdpHLrbp1+/jNYuaDSZbsuWLfFJbW1G6+8ObrhlWvz2kZkxqKiozbUbaz+Kh371q27oCgAAAAAAAAAgtwj3AXuUT2prY8uWLanjAw86KKP1987vk3b8t02bMlp/dzF0xIi474EH2rVN77z587uhIwAAAAAAAACA3LJXthsA6E4f/PX9tOMVK1bEtd+8Okvd7NkOGFgUt9z6w/j2t77V6rr6+vqY/+QTMfmss7upMwAAAAAAAACA7DO5D2hTbe3GtOMDDjwwS5103d82/S3bLdDIuJPHx4njxrW57qUXl3RDNwAAAAAAAAAAuUO4D2jTxx99lHY8sLg4S52wOyodPbrNNR/89a/d0AkAAAAAAAAAQO6wLS/Qpg8+/DD1ev/Cwix2knmnnz45Tp08Odtt5KR77rwjfj1jRqtrThw3Lu64974u3eeYLx7X5pqamg1dugcAAAAAAAAAQE9jch/QqjWrVsaWLVtSx/vuu18Wu8m8zZs3Z7uFnLXPPvt0y32GjhjR5prN9b5OAAAAAAAAAMCeRbgPaNWfV65KOz6ipCRLnWTGAQcemO0Weox99t23zTWNpzoCAAAAAAAAAJA5wn1Aq1atrEg7HjV2bJY6yYyBxcVpx7W1G7PUSe47bvToNtdUvfdel++zasWKLtcAAAAAAAAAANjdCPcBLXrt5Zfjw5qa1PGQkiGxT0FBFjvKjP0LC1Ov//r++1nsJLcdMLAo8vPzW11TX18f8598okv3ef3VV9pcM6D/gC7dAwAAAAAAAACgpxHuA1r07J+eSTsec/zxHa7Rp0+fTLWTMYcffnjq9Yc1NfFJbW0Wu8ltf3fkkDbXLF64sEv3KF+2rM01B+y/f5fuAQAAAAAAAADQ0wj3Ac364/z5UbVuXeq4eNCgOHbUqA7X6fOFL6Qdb968ucu9ddXBg9K35n32mWdaWMkRR5S0ueb5JUtiybNlnaq/asWKeH7JkjbXHXjQQZ2qDwAAAAAAAADQUwn3AU2sr6qKZ55ZnHZu8pe/3KlaBxx4YNrxp/WZCfdt2bKl09cOP/ro6N27d+p4+fJXM9HSbunSK69sc2veiIhbb7k5Vq1Y0aHaH6yvjn/5/vXt7gMAAAAAAAAAYE8i3AekWV9VFffdc3daeO7kk8fHkKHDOlVvYHFxWpDu7bff7nKPS8rKuhTu26egIMaO3bHFcF1dXTw1e3aX+9odHTCwKEpHjmxz3cbaj+Kab30z5j/5RLvqLnm2LK66/PJYV13d5tojS0rigIFF7aoLAAAAAAAAALC7EO4DUrYH++rq6lLnigcNijPOPbdLdQ8pPiT1+sOamlhfVdWles8/92yXro+IOPmUU9JChy+99GKX+4poeIZ/nD+/y3VyyZVXf7Nd0/s21n4UN998c1x09llx+63Tml1z+63T4sqvXhzf/ta32hXsi4i4+Ktf7Ui7AAAAAAAAAAC7hb2y3QCQG5aUlcW8ef+dNhFv/8LCuPzrV3W59sCiolhTuSZ1XL5sWZxRXNypWk/Nnh0f1tR0uaft0/uefbYsIhq2+b3vnrvjuuu/H/sUFHSq5ie1tfHwAzPiw5qaeKuyMi762tc6XSuXDB0xIqZMnhyPzZnTrvWrKytjdWVlu9e35sRx42LyWWd3uQ4AAAAAAAAAQE9jch/s4V57+eW447Yfx5w5s9OCfcWDBsXV3/5ORsJpO0/Je/bZslizamWH6/xx/vxUGC8Tzjj33BhSMiR1XFdXF3f/cnqnJvitr6qKu385PRU8XFO5Jt5+6612XfvU7Nlx7Tevjmu/eXXcc+edHb53d7jhlmkx8piju/We/Qv2ixtvvrlb7wkAAAAAAAAAkCt6/eBf/21atpsAOubtysqorKxMHR966GHxf4YNa/f1T82eHatXrYqHZvw6lr/6anzSaBveiIiTTx4fl151Vezdjq1Y22Pv/Pz4W93/F3/5y19S595csSL671cQBxUVtXn9J7W1Mes3D8f//u//RkTEkJIh8YUv9En13bt37xg/YUKnehsyZEisqngz/rZ5c0RE/G3z5nj1lfJIfrY1Bg8Z0sbVDf44f348Omtm2nbGU6eeG6P+/u/bvHZJWVk8/fSObXw31m6MLZs3d+jr2V2+fPY58dziP8bG2tpdfq/+BfvFnf91Vxx2RMkuvxcAAAAAAAAAQC6yLS/sBp59tiwjE+2KBw2KyV/+cgwZmvlg2RnnnhurVlakJttt2bIlfvPwQ7H0xRfjiJKSOHXy5LT1n9TWxrPPPBO1tRtjxYoVqfP7FxbGRV/7Wjxw/30Z6WufgoK4+tvfiQfuvy+q1q1L9fb00/Pjf//3hRg58ovxd8OGNnkmr738clS9+24sX/5qWqgvIuL00yfHuPHj23X/DRs2NDn39tr2TfzLhplPPBn/ev134w8LFu6yewwqKor//MlPY+iIEbvsHgAAAAAAAAAAuU64D4gRI0bEMceOjGNHjdql97n6299J27o2omH72jWVa9Km17WkeNCguPzrV2Vkq+DG9ikoiGtv/EH8/jcPx9Jly1Ln6+rqOhSc7NevX5x51tkdeo59+vRpcm7gwIHtvj4b/uOnP4+hQ4fFQw89GBtrP8po7fOmTo0bbpmW0ZoAAAAAAAAAAD2RcB/sgYaUDImBRUXRp0+fJhPzdqV9CgriB9NubRKia0vv3r3jlFMm7PJez//aJXHsccfFM4v+GGsq13To2pNPHh9nnHtuh+956uTJUbtxQ+p5DCkZEqf945QO1+luF112eVx02eVxz513xMIFC2JddXWX6p03dWpceuWVccDAtrdpBgAAAAAAAADYEyTqPt2SzHYTwJ7pqdmzm2y7u93+hYUxdNjwGDBgQLu3uM2k7dsCf1q/udkgYr9+/WLkyC92e0AyV32wvjoe+tWvIiLisTlz2lx/4rhxceBBB8XwESNi8lln7+r2AAAAAAAAAAB6HOE+ADJu/pNPxM0339zkvG13AQAAAAAAAADaJy/bDQAAAAAAAAAAAADphPsAAAAAAAAAAAAgxwj3AQAAAAAAAAAAQI4R7gMAAAAAAAAAAIAcs1e2GwAAAAAAACDdhpoN2W4BAAA6bUDhgGy3ALsF4T4AAAAAAIAc83ZlZbZbAACAThPug8xI1H26JZntJgAAAAAAANihcvWabLcAAACdVnLkkGy3ALsF4T4AAAAAAAAAAADIMXnZbgAAAAAAAAAAAABIJ9wHAAAAAAAAAAAAOUa4DwAAAAAAAAAAAHKMcB8AAAAAAAAAAADkGOE+AAAAAAAAAAAAyDHCfQAAAAAAAAAAAJBjhPsAAAAAAAAAAAAgxwj3AQAAAAAAAAAAQI4R7gMAAAAAAAAAAIAcI9wHAAAAAAAAAAAAOUa4DwAAAAAAAAAAAHKMcB8AAAAAAAAAAADkGOE+AAAAAAAAAAAAyDHCfQAAAAAAAAAAAJBjhPsAAAAAAAAAAAAgxwj3AQAAAAAAAAAAQI4R7gMAAAAAAAAAAIAcI9wHAAAAAAAAAAAAOUa4DwAAAAAAAAAAAHKMcB8AAAAAAAAAAADkGOE+AAAAAAAAAAAAyDHCfQAAAAAAAAAAAJBjhPsAAAAAAAAAAAAgxwj3AQAAAAAAAAAAQI4R7gMAAAAAAAAAAIAcI9wHAAAAAAAAAAAAOUa4DwAAAAAAAAAAAHKMcB8AAAAAAAAAAADkGOE+AAAAAAAAAAAAyDHCfQAAAAAAAAAAAJBjhPsAAAAAAAB2E4k15ZF4bXHDf2vKs90OOSCxpjy2TbssYsGD2W4lZyTqNkQseDC2fe+8htcAAJCj9sp2AwCQ69bWfRSzq96OiIiSvv3inENLstwRAAAAAD3S+sqIF59u9/LEiOMjOaS0Q7fYOvPuSC5b1XD96KGRN02ga0+3/Xti67JVkffmq5G4/v9lu6W2ra+M5NwZkXzjzUhWbYhE8YBIjB0TiYkXRAxs5+9nFzwYicOHN/sztPWHV0dy5bsREZFc9EjE1O9ksnsAAMgY4T4AAAAAAIBukPjg3fhsxswOXDEzEsUDIu/UiZGYeHEk+w3YZb2RPVu/NDr1OtOBzMRri1Nhz4iIxMW5H2JLvLY4PvvJf0R8XJ86l6zaEMmq/4lY+EzsdetP2wy9JtaUx2fT742IiF7/8v2IE85Jez/vjPNj68qfRETE1hkzo9fxp7c/NAgAAN3ItrwAAAAAAAA5Klm1IbbOmBlbr7/ENrt02NZ770i9zpsyPvcDbOsrU8G+xLBDoteM30WvPyyLvf7zR5EYdkjEx/Xx2X1aqL4AACAASURBVC3Xt7qVbqJuQ2z9+bSG18MOicTRJzVddMI5kRg9NHWYnDsj058EAAAyQrgPAAAAAAAgCxLFAyIxemiz/+0sWbUhPvvO/41Y0PpUt8Shh++oc+jhu6ZxeoYFD0ayakcILnHmFVlspn2Six5NTezLu+5HqTBi8tgJ0evr1zcs+ri+YSvdFmz9xfUNn3vf/Mi77kctTrzsdcbFqdfb5pU1bJsNAAA5xra8AAAAAAAAWZB36sSIqc1vk5qo2xDJF+fF1ocfTtuedOv0e2Ovw4e3uC1p4tJ/i8Qu6ZaeZtvS51Ove8TUvohI/uXtiGiYuLdzv8khpZEoHhDJqg2xreL1yJvaTIE50xu2Id43v2H73lY+c/LYCZEoviMVgEzOnRGJq2/L2GcBAIBMMLkPAAAAAAAgxyT7DYg47bLY6745DUGnRrbe/9MsdUVPkVhT3hBy+1ze2AlZ7KZ7JF5bHFtnzIyIiF6XXNJiALaxvFMnpl5ve2Fpq9v9AgBANpjcBwAAAAAAkKOS/QZEr5vvjq3XX7JjwtjKdxu25z3tsqYXLHgwYlNdw+u+/Zpf09gLj0d88F5sq3g9IiIS+x8Qif0PisSI49sVjtpu+6TB2FS3o9ahh0eib7+I40/v0NS47bWSf31vxyS3Qw+PxIEHR+L4KS1us5pmzvQdr9vzHNr73BqtSwweFsljG4Xm1ldGvPh0JD98P5IfftDwLA8/svmeP1/bxPsfpvXe5B7ttG3x4ztqFA/oVI1sSBx6eCSXrWr4Hl9fmfZ9k3htcepnoMmW0+sr47Of/EdERPS64qK2v97ba068OOLzQGB8XN/wPdzOawEAoDsI9wEAAAAAAOSwZL8B0eufr43P/uWm1Llti/8Qec2EkLYtfT41sS0xemizayIi4oXHY9vvHkiFpVL3iu3T3mZGonhA5J01tdWwU6JuQyQXPRKfPf5k2vbBEbFjctyMmZE3ZXzkfeV7rQbz2lXr4Yej1zlnRWLixa3W2j7BLaKN5/C59j63xut6XXFRxLETItZXxrb7/zNtUl7E9mdZFonFf4i8636UHlT74N34rFGPqWuqNqT1nrpHB217YemOe40d0+HrsyUx8YKIhc9EfFwf235xU+q5JV5bHFsfub9h0b75Desa2faLmyI+rm/YfriFra6bk+w3IBKjh6a+dsk3X42EcB8AADnEtrwAAAAAAAA5LnnshEgU7wizJVe+2/ktRF94PLb+50+aBPua3LNqQ2ydfm8k776x2fcTa8pj6w+vbgij7RTG29m2eWWx9fpLIrGmvPladRvaV+vj+tg6Y2Zs/eHVDZPdsiyxpjy2fvfKJsG+xpIr341t9/9nt/bU+BkmBg/ttnt32cCS2Ov7/xqxb34kV74bW6/4Smz90uj47F9uapjmt29+7HXrT9OCksmH/r3h52HYIZH3le91+JZ5w49Jvd72p+a/PwEAIFtM7gMAAAAAAOgBEmPHRLLqf3acWPt6h6e6Jeo2xGd3/9eO42GHRK+vX5++Be8Lj0fyzfLYNq+sYc1RTbfnTdRtiK0/n9YkIJg3ZXwk9j8oIiKS71SmhaWSVQ3X9Prpw2lT97YH+5Ir302v9Q+lkTispPlaK9+Nbb+4KXrdfHf7tundBZIfvh9bb7k+FaRLFA9ITclLvrQ07dkkl62KxJry1HNOHnBIw1S+2GnKYPGAyDt14o7jwcMi2dG+VryYfuKEczpYIbuSx06IXj8/JJJzZ0Ty7bdTwb3E8KMiMfGCSDbe4nnBg7Ht9/8TsW9+p78XEoOHpR+/trjHbGMMAMDuT7gPAAAAAACgB0gceHDacXLtyg6H+5Ivzkub6tZsIOqEcyJxwjmx19jFDfdoJhy27Xc/SwuvJYYd0nTr2YjY64zy2Hr/T1PBvWTd3yL5xnNpNbf97mdpwb5E8YDo9d1paYHDZmutfDe2/e5nkbj6tg49g0zZHn6MffOj19XfSvtMeWc3DSwmV7wYsf0zDSzZsX1s4+15D9o/bVvZjgb7IiKSm+pSrxPDDulEhRwwsCQSV98WiVaWJNaUx2cPP5ya5tfZkGdDkG/Hlted+bkCAIBdxba8AAAAAAAAPUDigEFdL9Io+BURrQaiksdOSAuapayv3BFsi0hNTWsc7EvVGFIaedf9KPKmjI9e//L96DXr2fSwYHO1dgr2Na7V6+a7I/bNT53bNq8su9vzbt8mdqcAZLLfgMg74/y0c9sqXu+WlpJ/eXvHQd8vdMs9u1uibkNsvf+nER/XR69LLmn2+6VDGn1PAQBALhHuAwAAAAAA2FMteLDDlyQXPZp23OuSS1qfmvb5FLbmJgA2qXXOWa0GtZL9BkSvSy5ptUZ3ajVY1sO2w+1Jtt03LZIr323Y2vi0y7pcL3HkYRnoCgAAMk+4DwAAAAAAYA+RGHF82vHW6ffGtu+dFzFneiReW9yuGmmT4SIicfyUTvfTpNbEi9u8Zuf77VyjuySKB7QdLDMRLuOSd98Y2/5UHnn/UNr8ZMnOeP/DzNQBAIAM2yvbDQAAAAAAANC25NqV6Sf69ut4jSGl0es7/xxbp9+749zKd2Prync/P7op8v6hNBJHfTESx09pdiJfcvU7qdeJYYe0PrWvrX4a1yoe0K5ayX4DGu77ec/JZas6ff8uOWj/Npckjjys2/tLHHr4jntu+lu33nuXW/BgbJtXFolhh0TeVdMi2fi99ZURLz6dOkyMOL7d2/UmqzZktk8AAMgQ4T7oQW664cbU6x/dflsWO9n9VK6ujIcemNHqmvz8PjHuhBPi4IMPjpIjS7qpM9h9+Dlr4DkAAAAAnZV8pzLtOHH48PRwU3uddln0GvH3kZw7I7a9sDTi4/q0t7f9qTziT+URDz8cvc45q+l0tMbr+36hMx00X6sdYbmM3Xc3lmgU+kymQps9X+K1xfHZ9Hsj9s2PXl+/Pj0IOmd6bJ0xc6crZkZi2CENa1sJ+SXWlKcfDx7WuZ8rAADYBYT7ANqpvn5zLF60MCIiDhs8OCaedloUFw/Kclewe/Fz1sBzAAAAAJpYX9kQuttu3/x2TyVr1sCSSFx9W/S6uiE0te2NlyJZ8WZ6GOzj+tg6Y2bkvVMZiev/X+p0onhAatJZ48l7ndHZWjtP/GOHxOBh6cevLY7ksROy1E1mJNaUx2c/+Y+IiOh1ySVp3/vJh/49tv3+fxrWjR4aeWNOjORf34ttC5+J5Mp347Nbro+97pvT4lTI5IoX008MPmbXfAgAAOiEvGw3ANATvbN2bdx3111Rubqy7cUZ8uv7fxU33XBj3HTDjd16X8iWbPyc5SL/3gAAAAAREclHpqcd5006JXO1j50QiUv/LfJ+9lj0mvG76HXFRRH75qfe3/an8ogXHk8dJ444bMfFH9c3mXzWETvXivXt+F3E+sq0iX9pNTrr/Q+7XiNHJI+dkP71e+OlLHbTdYm6DbH159MiPq6PvCnjI067bMeb6ytTwb68fyiNvGkPRpx2WSQu/bfY69afNqz5uD62/e5nLdZvPBEzMXpol7aZBgCATDO5D2AnBQX947s3XN/kfOXqyqh8661Y8vxzqXMPPTAjrvrmN03Ugg7yc9bAcwAAAADaZcGDTab2JSZesGvuNbAkYup3Yq/Bw+Kzf7lpx/kP3ku9TBz1xYZtez+3bfHjkWhjimCibkOzoamdayXnzojE1be1Wis5d0bTGq1pK7g3Z3pqeuDuIu+EMbFtXllERCRfWhqJS7PbT1ds/eHVkazaEIlhhzT93njx6dTLxMXp20cnh5RG3j+UxrY/lce2F5ZGr6ubKb7TRMy8MSdmsnUAAOgyk/sA2qnkyJI4ffKX4prvfTcGFhWlzs+e9Whs2rQpi53B7sPPWQPPAQAAAIj4PBD30L/H1un3pp3vdc5ZDSG8zlrwYJtLWtvGNXH8lPTJcPPKWq2ZeG1xfHb+5Nj2vfMi5kxPm/TX0Vqx4MFUaC0iGoKOx09pes/RQ3d8lqoNkXhtcfO9rSmPrY8/2fL9utumv2WkTOLMK1Kvk1Ub2vU1z0XJu29s2Cp63/zIu+5HrS9u5mcicdjn5xpNekzTKBzY0vcSAABkk3AfQAcVFhbGeRdeEPn5fSIiorZ2Y5Qv6/y2E0BTfs4aeA4AAACwe0t++H4kXlvc5L+YMz2Sd98Yn101NbXl6HZ5U8ZHTP1OCxXbYc702Dr93tg27bIWA2/b16U54OAdffcbEL2u/lba21un39sQ3KvbMQEvUbchYs70+Own/9Fw3cp3Y+uMmZFc8WJ6rXPOanet5oKOzU4EPPTw9JqP3J+25W+qt1uub9hauHhHjeTqd7q01XBXJFe+m/rsiTXlkXzo3zvXy8CStIDjtqXPZ7DLbjJneirIudf3/7XNQGtzz2nb0iUN7xU38z1StyEt2Jk36RRb8gIAkHNsywu7qbJnymLVyopYX12dOldQ0D9GHndclI4ujb59++7SGj+//adRW7sxIiKu+d53o7CwsNl1NTU1cefPfp6q3dz2lDv3tPyVV1K1IyJGlo6KEUcdFSVHduEvVTuosLAwJkyaGPPmzo2IiOWvvBLjTxnf6jVvvL4iqqur07bZjGjo/4gjjoijjxnR5JrGz7Gxhx7Yse3EyNJRcc7Us1u8b2eeWeXqytQ9xp14Upw++UutfjbYFdr7c+bfm6Z60r83Ef7NAQAAYM+1bV5Z+hS6NuRNGd/mlrWtSdRtiM8+DzMll62Kz5bdFIniOyIxdkwkDjw4EgcMiuTalZF8J32r0sSwQyJOOCe92AnnRN6U8rT+t86YGTFjZsP6vl+I5LJVTXsYPbRpOHHqdyLvw/ebr/V5QK25Wq0FHfOOPy0tGJlc+W5sveIrzfaWGHZI5J1xfmz9z580nPi4PrbOvDvypnXPtLvE6KFp/Wz/7Kn3+/aLaGPb4+b0OuPi+GxZw9bKyWWrIvHa4lYnMuaUBQ82PIeI6HXFRS32nZh4ccTjTzZ8ze7/afS6+e4dAb0FDzaEJSMi79SJTa5NLnokbaLfLtvqGgAAukC4D3YzVVXrYvasR5sNaNTWbozFixbG4kUL47wLL2o23JGpGplWuboyfj9rVtTXb27y3vLyl2N5+ctthk4ybczYMbF44aKor98ctbUbo6pqXRQXD2qyrqamJp56cm68s3Zts3W291/x5oq4+KtfyVh/XXlmK958M/V6yfPPCdqQNe39Ocsk/950XFefmX9zAAAAoHWJ4gHR65+v7XIwK9lvQOz1/X+Nrffe0bBVazRs2Zqs+p+WL9o3P3p9/fpINtfX1bdFr/2np0JYqft8HqjaWd6U8ZH3le+1WCuvz783mVTYXKgvIiLv/H+MxKX/1mLbySGlkXf+Pzatt1NviWGHRK+b745Y+3qLtXa1vFP+Mba28DkjIpLvVEaiE3WTx06IxOhHUs9w6yP3R14PCPcl6jbEZw8/HBERef9Q2uqkymS/AdHrkkti6/R7GwKc118SibFjImo+SAVUE8MOaVKjcdA14v9n7+6jrCrvQ4//EFea0em5iIKUEW6RF5cEEGlABMGogKO3SVSoliRFkdyk1JVlb0xq2sSqsTaxMelKe12WNPhuqFQM1xgyCmoE8YWxw9sECswwKTDUOK2S6Qh6mxvuH9M5cubMy5lhZs4DfD5rudbZ5+yz59mbffZfX5+nOSA8qqWuAQCgl1iWF44jDQ0N8cgDD7YZ5bW2fNkPYvOmLb1yjJ62edOWeOiBpW1GI0eqqtwQq378k14fz5FGjPxgaYfaXTV5nzc1NcUjDzzUbmhzpG3V1T02/qO9ZhPGj8++nj7z4h4ZE3RXZ7+znuR503U9cc08cwAAACBfvwvGxknX/W6c/Jd3x0lLftxjM64dPn9WnLTkx9H/5j9sDqfaM6Ak+i/6VJy85Mk43NGscfNujv5LH2ueRa8d/S4YGyf/5d3R74++2eGyp/1uuK35fDsY10mXTo6Tv/u/Owz7jjxe/0Wfavuz4Wc0X4N7l8fhzBnN16WDc+hVM+Y2j3NASe77A0qag8hZV3X70Cd97s+yrw//7F8iKvpmNsKj0RLs9Rt+Rpz0+Ts6/0L5wuj/Z38S/YafEYf3/Fv8+olnsmHfSdf9bnO82cqvn7r/g1n7BpQ0zwAIAAAJMnMfHEcqN7yRjSsGDjw9Zl1+ec7Meq+9+lqsX7suG+6tefbZvJn3euIYPamhoSG7FGVExIiRI+Piiz+WXd6xoaEh1r60LqoqN0RE84xPo0eN6rMlM4cOLYtt1dUREXHovffyPq98vTJ7rUpKTonpM2bkLKe5Z8/eWPfSS9ljrF/7Ukye8tHssqJHLhv6/e/9fTbaueHGRe2eY09cs9HnjI677+n+8h7Qkzr7nfUUz5viPG8iPHMAAAA4cRw+f1b0/0nXIr22ZrnrSMFLyZYvjH7lC6P/lyP67ayMePeXH3x26n/LBn0F/f2ho5tn8fujiH4b1+R+NnJiczxX2KiaZ5s7f1bzuFodqyVw7NI1mXdznDzn0zkz8x0+87+3OUtbvz/6ZvS/alf0+8W/tBtTdnWp3oL3n3dz9J93c845d+t8Wxs6Ovov+lT8v6U/iH7Dz4g4NXM0R+s75Quj/7SPdxiD5pgxN06aMTf3Xu7g3utXmmmOKQ8civ7XX1/43wEAgD4m7oPjSF3tBzM5/d78389bsnHqhVNj5KiRseS++9td2rEnjtGT1r60Lhsbjh03Lm8ZyUGDBsXcedfEwNNOizXPPRsRzcs79lVsU3LKB/8n5aFDh/I+r3rjjezr6+bPzxvX8OHD4tN/8Jm472/+NvbX10dERG1NbTa26Y7Urxl0VWe/s56S+m/H8wYAAADoLR3OzNfVY/Xgsq89Nlth5oyIQo81dHQcLuLyrD15/Vr0m/Pp6F+aiShf2OPH7k3dCe4Kvpf/K/o8/MqPjrnrAgDAiUXcB8eR9w59MJPT+4fant1q0KBBMevyOXHoYHMYUlLy4R4/Rk/a/l8zTJWUnBKfvLr9pQcuueySWL+uOTLZXl0dMe+aXhtTe95pYynjI2fC6sjYj4zLxjYt17W7jqVrBl3V1u+spxxLvx3PGwAAAAAKdThzhoCtDa4LAADHAnEfHEd+e+TI7JKMDz2wNKbPvDjKysryls2deuHUXj1GT9m1Y1d2RqgRI8+O0tLSDvcfMvS3oq62Ng4dOhgNDQ1HNRtVd5SUlHS+Uy871q4ZdFVv/c6Otd+O5w0AAAAAAADA8U/cB8eRmRfPiO3V1dnYYv3alyIiYvmyH8TQsrIY+5FxMW7CuA6Dip44Rk/Zt29f9vW26ur46q1fKfi7B94+0OfhyIdLTunw89defS3efvud7DXtDcfaNYOu6ux31l3H2m/H8wYAAAAAAADg+Cfug+PIoEGDYsGNC+O5ioqoq63N+Wx/fX3sr6+PNc89GyNGjow55eUxfPiwXjnGiaSQJS137dgVT69cmZ0REeiao1069njheQMAAAAAAABwYjmp2AMAetbw4cPis5/7n3HDjYti1pzLo6SN2Z3qamtjyX33xa4du3rtGCeK/fvrs68HnnZa3ud79uyNhx5YKrSBo9DZ7+xE4XkDAAAAAAAAcGIxcx8cp0afMzpGnzM6LrnskoiI2LxpS9TX1+cs0fj0ypVxy61f7tVj9JRZcy7PjiMVTU1NUVe7O7s9cvSovH1+tHJl9nVJySkxfcaMGDl6VN6Mhy8+/2Ksee7ZHh1fitcMuqqQ31lPS/G343kDAAAAAAAAcOIR98EJ4ryJE+K8iRNi8pSPxpL77o9Dhw7G22//e2zetCXOmzihx4/x4ZIPZ18fOvRet8Y88PTTs6+PnLEqFZWvV8ahQwcjojmkaR3QNDQ0xP76+uznn79pcQwaNKhXx5T6NYOu6ux3FuF5E+F5AwAAAAAAAHA8siwvHCd27dgVLz7/Yrz4/IuxedOWdvcbNGhQnDtuXHa7JRbpqWO0+I0PfxDbvPP2O+0eq6MQZ+Sos7Ovt1VXR0NDQ7v79rWGhoZYv25ddnv6jBl5+xx4+0D29ZChv9XroU1E2tcMuqqQ31mE502E5w0AAAAAAADA8UjcB8eJg4cOxZrnnm3+79lno6mpqd1933n737OvS0pO6dFjtDht4AczOtXU1LR7nHUvvdTuZ6WlpTFi5Mjs9vJl/9DhmPbs2RsvPv9iu5/3lD179sYjDzyUjRoHDjw9Jl8wOW+/3zhiNrE39/9ru8draGiIqjfe6PTvlpSUZF8fPHSozX1SvWbQVYX+ziI8byI8bwAAAAAAAACOR/3/9Gu33VHsQQCFeWHNmuzry2bPyvmstPTU+KfKN+JXv/rPOHToUOyurY1f//pwnDXsrOw+u3bsioqf/CR27diRfe8TV38yPvShD/XYMVo0/vKXsfOf/zkiIv51f30c+GVjjB17bvbzzZu2xIrly2N3bW32vZKSU2LaRdNzjnPGoMHxT5WVERHxH//xH7Gt+mfx/vv/N0acPSK7z549e2P9y6/ED5/8x9hdWxt1dXUx5pxz8sbUkbf//e3YtHFju+NoGfP6l9fHMytXxqEjYpcFN97Y5ixZ/fv3z17PX/3qP6Ouri5+szQTp5/RHCI1NTXF+nXr4wePPppzvLNHjso5vxa7dtXEv/7X0pcHDx2MSb/zO22eS19dsxPJO++/F9t+2Twj3Okf+o0YO+D0Tr5BW3rjdxbheRPheQMAAAAAAABwPOrX+N77h4s9CKAwX731K9nXd9/zzbzPN2/aEsuX/aDg482ac3lcctklPX6MiOaQZMl998fbR8zw15mBA0+PW279ct77Lz7/Yqx57tmjHlNHdu3YFQ89sLRL34mIuOHGRTH6nNHtft7VsUdETJo8JebOu6bgY7W1/9FesyOvx/SZF8eV/+OKgo91PKptfCf+cc/uiIgYXZqJub/d/r857eut35nnTbNj9XkT4ZkDAAAAAAAA0BbL8sJx5LyJE+La+Z8qaN/pMy9uM0jpiWNENC/X+Hvzf7/TY8yac3mn+1xy2SUFj+na+Z/qcmjTHSNGjow//tItHYY2Ec1jnzR5SqfH+vhVV2W332knUJp8weQYOLCwGeOO9ppt2bo1+3r92vaXMoXeVOjvzPOm2bH6vInwzAEAAAAAAABoy8nFHgDQs86bOCHOmzghXnz+xdj2s+rYX1+f/ayk5JSYPmNGjBw9KoYPH9arx4iIGD58WPzxl26Jyg1v5MUas+Zcnj3G+nXr4tChg52e18hRZ0fl65VR9cYbOTN0DRx4ekz66Edj8gWTo7S0tMPjHI2hZWUx9iPjCjr3I82dd02MGjUqqrduiW3V1dn3R4wcGePGj4+pF06NPXv2Zt+vq62NpqamvHMpLS2NBTfeEGtfWhdVlRuy7w887bQ2/+7RXLMJ48dn/8b0mRcXfK5wtLr7O/O8aXYsPm8iPHMAAAAAAAAA2mJZXgDohGV5AQAAAAAAAIC+ZlleAAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASIy4DwAAAAAAAAAAABIj7gMAAAAAAAAAAIDEiPsAAAAAAAAAAAAgMeI+AAAAAAAAAAAASMzJxR4AAAAAAAAAuf6t4d+KPQQAAOi2MwadUewhwHFB3AcAAAAAAJCY3bt2FXsIAADQbeI+6BniPgAAAAAAgMScdvrpxR4CAAAARdav8b33Dxd7EAAAAAAAAAAAAMAHTir2AAAAAAAAAAAAAIBc4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEnNysQcAAAAAAAAAqVux/Mmc7bnXzivSSGjPxqpNsbumJrt9amlplF9ZXsQRAQDA0RH3AQAAAAAAJGrd2pdj9+7d8fPdtTnvDz5zSAweNCimTp8WZWVDizS6E8sjDy7N2T6auK9iVUW8/tqrRzukPBdMvfCEjtl219Tk/DtNmjzlhL4eAAAc+8R9AAAAAAAACWlsbIzVFc/FyhUrorHxQIf7PvLg0pg0eUrM/8wfxJgxo/pohBytd5uaoqpyQ48fd9y48T1+zLasWP5kTkS3YOEiMxkCAEAvEPcBAAAAAAAkYmPVpvjOPfd0GvUdqapyQ1RVbhBYAQAAHGfEfQAAAAAAAAmoWFUR9//td7v9/UceXBpvNTTE4psW9+CoAAAAKBZxHwAAAAAAQJG1F/ZNmjwlLph6YUy7aFpkMpmIiKiv3x9bN2+J1197NW9p14pnno7BgwaZwS9xc6+d1+m/UeulbydNnhK3f/3O3h4aAACQEHEfAAAAAABAEe3cWROPP/xw3vvtLbNbVjY0ysqGRvmV5bFu7cvxvfvuy1nGd+WKFTF1+rQoKxvaq+MGAACgd4n7AAAAAAAAimjZY4/mxHkREXfc84SF6wAAIABJREFU/Y04f9LETr87Y+ZFceaQIXHXbbdljzHriiviN3+ztFfGCgAAQN8R9wEAAAAAABTJxqpNeUvrLli4qKCwr8WYMaPi09dfH48//HB87qabYsbMizr9m7trarLbrWf5q1hVEdVbt8a77zbFBVMvjPIry9s9Vn39/nht/StRV1cXb/3izdixfVtERJw1bHgMHjIkxo0b36VZBDsb28aqTfHaq6/GW794M3vdzjl3bIwYOSo+cdUnuzxbYX39/lizek38fHdt3vEumz07xowZ1aXjpaqt69adf6MVy5+MiIjq6q0577fejoiClobu6funO1rfc5a0BgAgJeI+AAAAAACAInl+9eqc7bOGDe9WXFR+ZXmMP29CQRHU7pqaeOTBpdnts0eNirKyobFzZ018/+/uzwZWERHjxo1v8xg7d9bE0z/8Yaz76Qttfr5v757Yt3dPVFVuiEceXBrXXDc/rr9hQY+OrcWO7dtix/Zt8cratXHbXXcVHOQ9/NAj8dQTy9o9XsUzTxc87lRtrNoUyx57tM3r1ta/0dXXXBWZTKbd4x35b3OkqsoNeZFqR/dxb90/3dH6nhP3AQCQEnEfAAAAAABAETQ2NubFTR+/6upuH+9oZjfbubMmZ2nfjqxY/mS7kVd7nnpiWfxsy+b4q+98u8tjq1hVEff/7Xc73a+x8UB8995vxX3fW9Lpvnf++e15MVpbWsb9tTtuL2isKSn0urVoOdfP/uHiXp2xsK/vHwAAOJaJ+wAAAAAAAIpg86Ytee9Nu2han4+jqakpvv939xcU9kVEnFpamn2dyQyIaTNnxrjx4+O8iROys77t3FkTz69eHRXPPJ3dd8f2bbFi+ZNdmhmt9axqEc3L5p5aWhpvvflm7Nu7J+ezfXv3RMWqig6XEr7/vvvbDPvOGjY8xp03MQYPGhTV1Vuz++zYvi1++NTKgsecgvbCvvbOscWO7dvirttui/v+fkmbM/gtWLgoIiLvu5MmT2l3lsfW+vL+AQCAY524DwAAAAAAoAjeevPNnO1zzh3b4ZKoveWFNauzkdxZw4bHpbNmx/iJE9udva38yvL40cofxpRp09tdxnXMmFExZsyoGDxoUE6ct3LFiphdPqfg8zzyuzM+dmnM/8ync2YobCtiq966td24b2PVppxgLKI5MLtq7tycaGzutfOivn5/LHvs8Vj30xfaXL43VTt31uRdk/bOsbGxMR5/9PGca9LYeCD++t5vx+1fvzPv2Ed+/8i4b9y48QVHd315/wAAwLFO3AcAAAAAAFAETQcP5mwfOaNZX2qJtK65bn5cf8OCgr7zjXu/VVBgNffaeTnxYGPjgdi8aUvMmHlRl8a4+As3txnslV9ZHnV1dTlxWl1tTbvHWfbYo3nvffHWW+P8SRPz3i8rGxpfuvXLMWLEiC4vI1tMbZ3jbXfd1WasmclkYvFNiyMicq5hVeWG2Fi1qc3r0hP6+v7pyNTp0+LsUb23DDEAABwNcR8AAAAAAEAR/Hx3bbe/u2L5k53uM3X6tJxZ7jqyYOGiLi132pWZ06ZMmx77nvhg+dzWMxZ25prr5ne4zO648eNzwrTWS/W22LmzJnZs35bz3oKFizoN2OZeOy/q6upi3U9f6MKoi6O+fn/eUrsLFi5qdxbGFotvWhzVmzflXLvnV6/utbivL++fzpSVDS34dwIAAH1N3AcAAAAAAFAEg88c0u3vFjKT3NmjRhUULZ01bHiXwr6uKj3llJzttxoaCv5uJjMgrr7mqg73OXNIYddx66ZNee/NLp9T0Hfnf+bTx0Tc99r6V3K2M5kBBZ/jx6+6Omc533U/fSE+t/jzRV8C92juHwAAONaJ+wAAAAAAAIpg8KBBxR5CRERcOmt2t79bsaoi6urqoq42d1a8SZOnxOAzh8SIESPylh9+6xeFz7w264orOo3LOpuVrkVdXV3O9qTJUwoO146Vmd1an+O0mTMLPsdpF03LifsiImprdvfa7H0RvX//AADAsU7cBwAAAAAAUASnlpbmbLdeTrUjkyZPyXvv3aamvGVne8u6tS/HPzz2aLtL4HblXDrSeta2o/Huu0052+PGje+xY6ei9Tl2JSDNZDKRyQyIxsYDPT2sPH11/wAAwLFO3AcAAAAAAFAE48+bkPfeurUvx4yZF3X63du/fmfeexurNsUdX/3THhlbRypWVeTN8HbOuWPjgqkX5rxXV1cXm6uq+iQWo2f8VtnQnH+vpqamDvbuHvcPAAAUTtwHAAAAAABQBGVlQ+Occ8fmzLb3wprVBcV9xbKxalNOmJXJDIgv3nprh0u3PvzQI/HUE8v6Ynhd8lZDQ7GHkJzWMz+Wtppd8mgdT/cPAAD0hZOKPQAAAAAAAIAT1aWzZudsV1VuiI1Vm7p1rN01NT0xpA49v3p1znZnYVZEzy6tezRaL8Nbvbl71zllv332yJzt1197teDv7tyZf/8MPnPwUY/pSMfy/QMAAMUg7gMAAAAAACiS8ivL46xhw3Pe+84997QZWnWkYlVFPPLg0p4cWps2V1XlbHcWZqVk8JAhOdv79u4pOKTsbnDZ184+++yc7R3bt0V9/f6Cvts6vDtr2PAoKxvaY2OLOLbvHwAAKAZxHwAAAAAAQBF99g8X52w3Nh6Iu267reDAb8XyJ3OWOu1NjY0Huvydurq6XhhJ182YeVFeSPn9v7s/GhsbO/3ussce7a1h9ag2z3HJkk6/t3NnTVQ883TOe61nlexI08GDBe13LN8/AABQDOI+AAAAAACAIjp/0sS45rr5Oe81Nh6IL9/8hVix/Ml247ONVZvizj+/vU9m7Gtxzrljc7YrVlV0uH/FqopY99MXenNIXdI6WNu3d0/8xR13tju7XWNjY9x7z7dix/ZteZ8VOiNeX2trqef772s/Yty5sybuuu22nPcymQExu3xOwX9zwyvr895r6+/19f3z1ptvdrpPxaqKuPPPb8/+BwAAKTm52AMAAAAAAAA40V1/w4I4+O67ebOnPfLg0njkwaUxafKUGHzmkDjl1FPj57tro2bHzrxZ0DKZAd2aGa0rLph6YU7o9vjDD8eppaUxY+ZFOfvV1++PZY893maYVVW5IVYsfzLmXjuvV8falrnXzovXX3s15xx2bN8WX/niLTHriitiwoQJ2fe3bNkSa37yk+w1bX19v79kSXz285/v8aVrj9bca+dFdfXWqKrckH2v4pmno3rzprh01uw4e9SoiIhoamqK6q1b8+65iIjP3XRTZDKZgv/mvr174k++eEtcMPXCaDp4MDa8sj4GDxkSt3/9zpz9+vr+2bd3T9x7z7figgsvjLfefDOaDh6M629YkLPPu01NOdcKAABSIu4DAAAAAABIwOKbFscpp54aTz2xLO+zzuKjSZOnxKWzZse937i7t4YXERGzy+fEyhUrspFbY+OBuPcbd8c/PDY8Bg8ZEhHNs6Xt27sn+50FCxflBXXV1VuLEvdFRNx8yy3xlS/ekhPqNTYeiKeeWNbmtY9onnHu0lmzc5Y/rqrcEG9ddXVycV9ExP/60i3xF3fcmXPN9+3dU9Asj4u/cHNebNday7/1kXZs35b391rr7funJVw80rqfvpATCbaO+wAAIGWW5QUAAAAAAEjE9TcsiDvu/kacNWx4wd9ZsHBR3P71O6O0tLQXR9Ysk8nEbXfdFZnMgJz39+3dE1WVG6KqckM2zMpkBsTiL9wcc6+dF4PPzI/BiqWsbGh88zvfzlsitj2TJk+Jr91xe5vhWKoymUx87Y7bY8bHLu3CdwbEl/70q1F+ZXmn+86YeVFB12/d2pfzxtWb98/5kyZ2Oq6NVZsKOhYAAKTAzH0AAAAAAAAJOX/SxLjve0uiYlVFVG/dGpurqvKW2z1r2PC4dNbsmDp9Wp/PHDdmzKj45ne+HU+v/D9tLumayQyIaTNnxieu+mR2bJ+4+uqoq61pcza3YigrGxp/9Z1vR8WqivjRyh+2Oa6zhg2Pj191dTZ2y2Qycc1189ud3S81mUwmvnTrl+Oy2bPj+dWr21ziNuKDe2l2+ZwuLcX7tTtuj8cffbzNe2DGxy6NcePHtzkDYG/fP1+74/b463u/3eZslzM+dmkMPnNwIacHAABJ6Nf43vuHiz0IAAAAAAAA2tfY2Bi1Nbsjojn+S0XLuJqamrIzB3Y0vp07a+LdpqakziHig3G1nMfgMwe3G022nHNH+6ToyHuo5TxPLS2NMWOObkbCI48b0bX7szfvn/r6/fHWL96KiOiR8wQAgGIQ9wEAAAAAAAAAAEBiTir2AAAAAAAAAAAAAIBc4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx4j4AAAAAAAAAAABIjLgPAAAAAAAAAAAAEiPuAwAAAAAAAAAAgMSI+wAAAAAAAAAAACAx/Q4fPny42IMAAAAAAAAAAAAAPmDmPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4DAAAAAAAAAACAxIj7AAAAAAAAAAAAIDHiPgAAAAAAAAAAAEiMuA8AAAAAAAAAAAASI+4D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AAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAAAAAAAAAAJIxwHwAAAAAAAAAAACSMcB8AAAAAAAAAAAAkjHAfAAAA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cR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAkRtwHAAAAAAAAAAAAiRH3AQAAAAAAAAAAQGLEfQAAAAAAAAAAAJAYcR8AAAAAAAAAAAAk5v8DuCUVhq41CaUAAAAASUVORK5CYII=';
        
        let doc = new jsPDF();
        doc.addImage(imgData, 'PNG', 0,0, 215, 279);
        
        //InvoiceID
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text(50,28.5, getInvoiceInfo.invoiceID);

        /*----------------VENDOR INPUTS-----------------*/
        //Vendor Name
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.setFontStyle('bold');
        doc.text(18.5, 62, vendorInputs.vendorName);
        

        //Vendor Address
        let vendorAddress = `${vendorInputs.vendorAddress}, ${vendorInputs.vendorCity}, ${vendorInputs.vendorState} ${vendorInputs.vendorZip}`;
        doc.setFontSize(9);
        doc.setFontStyle('regular');
        doc.text(23, 66.5, vendorAddress);
        
        //Vendor Email
        doc.setFontSize(9);
        doc.text(23, 70.3, vendorInputs.vendorEmail);
        
        //Vendor Phone
        doc.setFontSize(9);
        doc.text(53, 70.3, vendorInputs.vendorPhone);
        /*----------------BUSINESS INPUTS-----------------*/
        //Business Address
        doc.setFontSize(9);
        doc.text(151.5, 59, businessInputs.businessAddress);
        
        //Business City-State
        doc.setFontSize(9);
        doc.text(151.5, 63, `${businessInputs.businessCity}, ${businessInputs.businessState}`);
        
        //Business Phone
        doc.setFontSize(9);
        doc.text(151.5, 66.9, businessInputs.businessPhone);
        
        //Business email
        doc.setFontSize(9);
        doc.text(151.5, 70.3, businessInputs.businessEmail);
       
        /*-----------------CALCULATION INFO------------------*/
        //Amount Due
        doc.setFontSize(18);
        doc.setFontStyle('bold');
        doc.text(37, 195.2, `${getInvoiceInfo.amountDue}`);
        
        //Amount Due
        doc.setFontSize(9);
        doc.text(160, 207.4,`${getInvoiceInfo.amountDue}`);
        
        
        //Issue Date
        doc.setFontSize(9);
        doc.setFontStyle('regular');
        doc.text(21, 205, `${invoiceIssueDate.getMonth()+1}/${invoiceIssueDate.getDate()}/${invoiceIssueDate.getFullYear()}`);
        
        //Due Date
        doc.setFontSize(9);
        doc.text(45, 205, `${invoiceDueDate.getMonth()+1}/${invoiceDueDate.getDate()}/${invoiceDueDate.getFullYear()}`);
        
        //Sub-Total
        doc.setFontSize(9);
        doc.text(160, 185.8, getInvoiceInfo.subtotal);
        
        //Tax Rate
        doc.setFontSize(9);
        doc.text(150.8, 192.9, getInvoiceInfo.taxRate);
        
        //Tax Amount
        doc.setFontSize(9);
        doc.text(160, 192.9, getInvoiceInfo.taxAmount);
        
        /*-------------------INVOICE ITEMS---------------------*/
        let startingX = 19,
            startingY = 100;
        
        invoiceItems.forEach(item=>{
            let itemType = item.itemType,
                itemDesc = item.itemDescription,
                itemPrice = item.itemUnitPrice.toString(),
                itemQty = item.itemQuantity.toString(),
                itemAmount = item.itemAmount.toString();
            
            doc.setFontSize(9);
            doc.setFontStyle('bold');
            doc.text(startingX, startingY, itemType);
            //Item Desc
            doc.setFontStyle('regular');
            doc.text(startingX, startingY + 5, itemDesc);
            //Item Price
            doc.text(startingX + 100, startingY + 2.5, itemPrice);
            //Item Qty
            doc.text(startingX + 136.5, startingY + 2.5, itemQty);
            //Item Amount
            doc.setFontStyle('bold');
            doc.text(startingX + 169, startingY + 2.5, itemAmount);
            
            startingY+=15;
            
        });
        
        
        
        doc.save(`${fileName}.pdf`); 
        
    }
    
    
    //Public Methods
    return {
        init: () => {
            loadEventListeners($);
            
            UICtrl.populateItemTypeSelect(StorageCtrl.getGenericFromStorage('itemType'), UISelectors.itemTypeSelect);
            
            UICtrl.populateEmployeeSelect(StorageCtrl.getGenericFromStorage('employee'), UISelectors.salesPersonSelect);
            
            UICtrl.populateVendorSelects(StorageCtrl.getGenericFromStorage('vendors'), UISelectors.vendorsSelect);
            
            loadBusinessData();
            
            loadInvoiceData();
            
            UICtrl.populateStateSelects();
        }
    }

})(StorageCtrl, ItemCtrl, UICtrl, StateCtrl, $);





Dropzone.options.logoDropZone = {
    paramName: "image", // The name that will be used to transfer the file
    maxFilesize: 2, // MB
    acceptedFiles: 'image/jpeg, image/png',
    dictDefaultMessage: 'Drop Logo Here',
    resizeWidth: '150px'
};


AppCtrl.init();