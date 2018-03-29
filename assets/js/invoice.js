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
            console.log(retrievedData);
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

    const Vendors = function(vendorName, vendorAddress, vendorCity, vendorState, vendorZip){
        this.vendorName = vendorName;
        this.vendorAddress = vendorAddress;
        this.vendorCity = vendorCity;
        this.vendorState = vendorState;
        this.vendorZip = vendorZip;
    }
    
    const Business = function(id, businessName, businessAddress, businessCity, businessState, businessZip){
        this.id = id;
        this.businessName = businessName;
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
        bussinessFrom: [],
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
            invoiceData.bussinessFrom = [];
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
            newVendor = new Vendors(vendorInputs.vendorName, vendorInputs.vendorAddress, vendorInputs.vendorCity, vendorInputs.vendorState, vendorInputs.vendorZip);
        
            vendorsList.vendors.push(newVendor);
            
            return newVendor;
        },
        addBusiness: (businessInputs)=>{
            let newBusiness,
                id = 0;

            //Instantiate a new bussiness object
            newBusiness = new Business(id, businessInputs.businessName, businessInputs.businessAddress, businessInputs.businessCity, businessInputs.businessState, businessInputs.businessZip);
            
            //Add new bussiness to storage
            StorageCtrl.storeBusiness(newBusiness);
        },
        addItems: (itemInputs)=> {
            let newItem,
                ID;
            
            //Add auto-increment id
            if(invoiceData.invoiceItems.length > 0){
                ID = invoiceData.invoiceItems[invoiceData.invoiceItems.length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            newItem = new InvoiceItem(ID, itemInputs.itemType, itemInputs.description, itemInputs.quantity, itemInputs.unitPrice, parseFloat(itemInputs.itemAmount));
            
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
            invoiceData.bussinessFrom.push(businessInputs);
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
            
            invoiceData.salesPerson = retrievedInvoice.salesPerson;
            invoiceData.invoiceId = retrievedInvoice.invoiceID;
            invoiceData.issueDate = retrievedInvoice.issueDate;
            invoiceData.dueDate = retrievedInvoice.dueDate;
            invoiceData.subject = retrievedInvoice.subject;
            invoiceData.invoiceItems = retrievedInvoice.invoiceItems;
            invoiceData.bussinessFrom = retrievedInvoice.businessFrom;
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
            return subtotal.toFixed(2);
        },
        updateInvoiceStatus:(retrievedData)=> {
            let currentTime = new Date().getTime();
            
            retrievedData.forEach(datum=>{
                if(datum.invoiceData.status === 'Due' && currentTime > datum.invoiceData.dueDate){

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
        pdfView: '.pdfView',
        printInvoice: '.printInvoice',
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
        vendorAddress: '.vendorAddress',
        vendorCity: '.vendorCity',
        vendorZip: '.vendorZip',
        vendorNameMod: '.vendorNameMod',
        vendorAddressMod: '.vendorAddressMod',
        vendorCityMod: '.vendorCityMod',
        vendorZipMod: '.vendorZipMod',
        businessName: '.businessName',
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
        
        //Selects
        vendorsSelect: '.vendorsSelect',
        invoicesDue: '.invoicesDue',
        invoicesPaid: '.invoicesPaid',
        invoicesPastDue: '.invoicesPastDue',
        salesPersonSelect: '.salesPersonSelect',
        vendorState: '.vendorState',
        vendorStateMod: '.vendorStateMod',
        businessState: '.businessState',
        itemType: '.itemType',
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
        
        //Images
        paidStamp: '#paidStamp',
        pastDueStamp: '#pastDueStamp',
        
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
                vendorAddress: document.querySelector(UISelectors.vendorAddressMod).value,
                vendorCity: document.querySelector(UISelectors.vendorCityMod).value,
                vendorState: document.querySelector(UISelectors.vendorStateMod).value,
                vendorZip: document.querySelector(UISelectors.vendorZipMod).value
            }
        },
        getVendorInputs: () => {
            return {
                vendorName: document.querySelector(UISelectors.vendorName).value,
                vendorAddress: document.querySelector(UISelectors.vendorAddress).value,
                vendorCity: document.querySelector(UISelectors.vendorCity).value,
                vendorState: document.querySelector(UISelectors.vendorState).value,
                vendorZip: document.querySelector(UISelectors.vendorZip).value
            }
        },
        getBusinessInputs: ()=>{
            return {
                businessName: document.querySelector(UISelectors.businessName).value,
                businessAddress: document.querySelector(UISelectors.businessAddress).value,
                businessCity: document.querySelector(UISelectors.businessCity).value,
                businessState: document.querySelector(UISelectors.businessState).value,
                businessZip: document.querySelector(UISelectors.businessZip).value 
            }   
        },
        getItemInputs: () =>{
            const selectBox = document.querySelector(UISelectors.itemType);
            const selectIndex = selectBox.options[selectBox.selectedIndex].text;

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
            document.querySelector(UISelectors.vendorAddress).value = vendorData.vendorAddress,
            document.querySelector(UISelectors.vendorCity).value = vendorData.vendorCity,
            document.querySelector(UISelectors.vendorState).value = vendorData.vendorState,
            document.querySelector(UISelectors.vendorZip).value = vendorData.vendorZip
        },
        displayBusiness: (businessData)=>{
            document.querySelector(UISelectors.businessName).value = businessData.businessName,
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

            const mapVendors = vendorData.map(x=> x.vendorData.vendorName)
                .forEach((y, index)=> {
                    let option = document.createElement("option");
                        option.text = y;
                        option.value = index;
                        document.querySelector(selector).appendChild(option);
                });
        },
        populateSelects: (invoices)=>{
//            $(UISelectors.invoicesPaid).find('option:gt(0)').remove();
//            $(UISelectors.invoicesPastDue).find('option:gt(0)').remove();
//            $(UISelectors.invoicesDue).find('option:gt(0)').remove();
            
            const invoiceForEach = invoices.forEach(x=> {
                let vendorName = x.invoiceData.vendorTo[0].vendorName,
                    dueDate = new Date(x.invoiceData.dueDate),
                    option = document.createElement("option");
                if(x.invoiceData.status === 'Paid'){ 
                        
                        option.text = `Vendor: ${vendorName} Date Due: ${dueDate.getMonth()}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
                        option.value = `${x.invoiceID}`;
                        document.querySelector(UISelectors.invoicesPaid).appendChild(option);
                } else if(x.invoiceData.status === 'Past Due'){
                        option.text = `Vendor: ${vendorName} Date Due: ${dueDate.getMonth()}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
                        option.value = `${x.invoiceID}`;
                        document.querySelector(UISelectors.invoicesPastDue).appendChild(option);
                } else {
                        option.text = `Vendor: ${vendorName} Date Due: ${dueDate.getMonth()}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
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
            document.querySelector(UISelectors.issueDate).value = `${issueDate.getMonth()}/${issueDate.getDate()}/${issueDate.getFullYear()}`;
            document.querySelector(UISelectors.dueDate).value = `${dueDate.getMonth()}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
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
                        <td class="modifytd align-middle"><button class="btn btn-warning editInvoiceItem mr-2" type="button"><i class="far fa-edit h3 mb-0"> </i></button>
                        <button class="btn btn-danger deleteInvoiceItem" type="button"><i class="far fa-trash-alt h3 mb-0"></i></button></td>
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
                            <td class="modifytd align-middle"><button class="btn btn-warning editInvoiceItem mr-2" type="button"><i class="far fa-edit h3 mb-0"> </i></button>
                            <button class="btn btn-danger deleteInvoiceItem" type="button"><i class="far fa-trash-alt h3 mb-0"></i></button></td>`;
            
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
                                <td class="modifytd align-middle"><button class="btn btn-warning editInvoiceItem mr-2" type="button"><i class="far fa-edit h3 mb-0"> </i></button>
                                <button class="btn btn-danger deleteInvoiceItem" type="button"><i class="far fa-trash-alt h3 mb-0"></i></button></td>`;
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

})();


//==============STATE CONTROLLER=================
const StateCtrl = (function(){
    //Get UI selectors
    const UISelectors = UICtrl.getSelectors();
    
    //Public Methods
    return {
        
        displayVendorState: ()=> {
            document.querySelector(UISelectors.vendorName).disabled = true,
            document.querySelector(UISelectors.vendorAddress).disabled = true,
            document.querySelector(UISelectors.vendorCity).disabled = true,
            document.querySelector(UISelectors.vendorState).disabled = true,
            document.querySelector(UISelectors.vendorZip).disabled = true,
            document.querySelector(UISelectors.editVendor).style.display = 'block',
            document.querySelector(UISelectors.updateVendor).style.display = 'none',
            document.querySelector(UISelectors.backBtn).style.display = 'none'
        },
        displayBusinessState: ()=> {
            document.querySelector(UISelectors.businessName).disabled = true,
            document.querySelector(UISelectors.businessAddress).disabled = true,
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
            document.querySelector(UISelectors.businessCity).disabled = false,
            document.querySelector(UISelectors.businessState).disabled = false,
            document.querySelector(UISelectors.businessZip).disabled = false,
            document.querySelector(UISelectors.editBusiness).style.display = 'none',
            document.querySelector(UISelectors.saveBusiness).style.display = 'block',
            document.querySelector(UISelectors.saveBusiness).classList = 'btn btn-success saveBusiness',
            document.querySelector(UISelectors.backBtn2).style.display = 'block'
        },
        editVendorState: ()=>{
            document.querySelector(UISelectors.vendorName).disabled = false,
            document.querySelector(UISelectors.vendorAddress).disabled = false,
            document.querySelector(UISelectors.vendorCity).disabled = false,
            document.querySelector(UISelectors.vendorState).disabled = false,
            document.querySelector(UISelectors.vendorZip).disabled = false,
            document.querySelector(UISelectors.editVendor).style.display = 'none',
            document.querySelector(UISelectors.updateVendor).style.display = 'block',
            document.querySelector(UISelectors.backBtn).style.display = 'block'
        },
        editItemState: ()=>{
            document.querySelector(UISelectors.updateItem).style.display = 'block';
            document.querySelector(UISelectors.backBtn3).style.display = 'block';
            document.querySelector(UISelectors.addNewItem).style.display = 'none';
        },
        initBussinessState: ()=> {
            document.querySelector(UISelectors.businessName).disabled = false,
            document.querySelector(UISelectors.businessAddress).disabled = false,
            document.querySelector(UISelectors.businessCity).disabled = false,
            document.querySelector(UISelectors.businessState).disabled = false,
            document.querySelector(UISelectors.businessZip).disabled = false,
            document.querySelector(UISelectors.editBusiness).style.display = 'none',
            document.querySelector(UISelectors.saveBusiness).style.display = 'block',
            document.querySelector(UISelectors.backBtn2).style.display = 'none'   
        },
        clearItemInputs: ()=> {
            document.querySelector(UISelectors.itemType).value = '';
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
        
        //Save Business
        document.querySelector(UISelectors.saveBusiness).addEventListener('click', saveBusiness);
        
        //Save Invoice
        document.querySelector(UISelectors.saveInvoice).addEventListener('click', saveInvoice);
        
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
        
        //Add Item click
        document.querySelector(UISelectors.addNewItem).addEventListener('click', addItem);
        
        //back btn click
        document.querySelector(UISelectors.backBtn2).addEventListener('click', StateCtrl.displayBusinessState);
        
        //back btn click
        document.querySelector(UISelectors.backBtn).addEventListener('click', StateCtrl.displayVendorState);
        
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
        document.querySelector(UISelectors.comments).value = '';
        document.querySelector(UISelectors.pastDueStamp).style.display = 'none';
        document.querySelector(UISelectors.paidStamp).style.display = 'none';
        
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
        
         UICtrl.showAlert("Successfully Updated", 'alert-success py-2 d-flex justify-content-center mt-5', '#parentAlert2', '#childAlert2');
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
        
        setTimeout(function() {
            newInvoice();
        }, 3000);
        
    }
    
    const loadBusinessData = ()=>{
        let business = 'business';
        
        const retrievedData = StorageCtrl.getGenericFromStorage(business);
        
        if(retrievedData.id === 0){
            UICtrl.displayBusiness(retrievedData);
        
            StateCtrl.displayBusinessState();
        }else {
            StateCtrl.initBussinessState();
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
            
            if(retrievedInvoice.status === 'Past Due'){
                document.querySelector(UISelectors.pastDueStamp).style.display = 'block';
                document.querySelector(UISelectors.paidStamp).style.display = 'none';
            }else if(retrievedInvoice.status === 'Paid'){
                document.querySelector(UISelectors.paidStamp).style.display = 'block';
                document.querySelector(UISelectors.pastDueStamp).style.display = 'none';
            }else{
                document.querySelector(UISelectors.pastDueStamp).style.display = 'none';
                document.querySelector(UISelectors.paidStamp).style.display = 'none';
            }
            
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
        
        //Store Update inputs in local storage
        StorageCtrl.updateInvoiceItem(key, invoiceId, itemId, updatedInputs);
       
        //calcAmounts();
        
        UICtrl.displayUpdatedItem(itemId, updatedInputs);
        
        UICtrl.showAlert("Invoice item Updated", 'alert alert-success py-2 d-flex justify-content-center mb-0', '#parentAlert3', '#childAlert3');
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
            key = 'invoices';
        
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
        
        console.log(ItemCtrl.retrieveInvoiceItems());
        
        //retrieve invoice item from storage
        const retrievedStorage = StorageCtrl.retrieveInvoiceItems(key, invoiceId, itemId);

        UICtrl.displayFoundItems(retrievedStorage);
        
        StateCtrl.editItemState();
        
    }
    
    
    //Public Methods
    return {
        init: () => {
            loadEventListeners($);
            
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