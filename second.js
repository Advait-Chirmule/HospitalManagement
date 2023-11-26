let searchButton = document.getElementById('button1');
searchButton.addEventListener('click', async function (e) {
    const response = await fetch("/clicked", {
        method: "post",
        headers: { "Content-Type": "application/json" },
    });

    // read the body of the response
    const data = await response.json();
    const a1 = document.getElementById('content');
    const c1 = a1.innerHTML;
    let c = c1;
    let a = a1;
    var count = Object.keys(data).length;
    var htmltable = '<table><th>Sr No</th><th>Name</th><th>Floor Number</th><th>Room Number</th><th>Illness</th><th>Cost</th><th>Edit</th><th>Delete</th></tr>'
    for (i = 0; i < count; i++) {
        htmltable = htmltable + '<tr><td>' + JSON.stringify(data[i]['Sr']) + '</td>';
        htmltable = htmltable + '<td>' + JSON.stringify(data[i]['Patient']).slice(1, -1) + '</td>';
        htmltable = htmltable + '<td class="center1">' + JSON.stringify(data[i]['Details']['Floor']) + '</td>';
        htmltable = htmltable + '<td class="center1">' + JSON.stringify(data[i]['Details']['Room']) + '</td>';
        htmltable = htmltable + '<td>' + JSON.stringify(data[i]['Illness']).slice(1, -1) + '</td>';
        money = JSON.stringify(data[i]['Cost']).split("")
        money = money.reverse()
        k = []
        kpointer = 0
        for (j = 0; j < money.length; j++) {
            k[kpointer] = money[j];
            kpointer = kpointer + 1;
            if (j == 2) {
                break;
            }
        }
        if (money.length > 3) {
            for (j = 3; j < money.length; j++) {
                if (j % 2 == 1) {
                    k[kpointer] = ','
                    kpointer = kpointer + 1
                }
                k[kpointer] = money[j]
                kpointer = kpointer + 1
            }
        }
        k = k.reverse()
        money = k.join('')
        htmltable = htmltable + '<td class="money">&#x20B9; ' + money + '</td>';
        htmltable = htmltable + `
            <td><form action="/" method="post" autocomplete="off">
            <button class="btn btn-danger" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample` + JSON.stringify(data[i]['Sr']) + `" aria-expanded="false" aria-controls="collapseExample">Edit</button>
            <div class="collapse" id="collapseExample` + JSON.stringify(data[i]['Sr']) + `">
            <div class="card card-body">
            <select name="newValue1" id="newValue1">
            <option value="Patient">Name</option>
            <option value="Floor">Floor</option>
            <option value="Room">Room</option>
            <option value="Illness">Illness</option>
            <option value="Cost">Cost</option>
        </select>
        <input type="text" name="newValue2" placeholder="Enter Value">
        </div>
        <div class="modal-footer">
            <button type="submit" id="ebutton` + JSON.stringify(data[i]['Sr']) + `" name="ebutton` + JSON.stringify(data[i]['Sr']) + `" class="btn btn-danger">Save Changes</button></form></td>
        </div>
            </div>
                `
        htmltable = htmltable + '<td><form action="/" method="post" autocomplete="off"><button type="submit" id="dbutton' + JSON.stringify(data[i]['Sr']) + '" name="dbutton' + JSON.stringify(data[i]['Sr']) + '" class="btn btn-danger">Del</button></form></td></tr>';
    }
    htmltable = htmltable + '</table>';
    a.innerHTML = htmltable;
});

let searchButton2 = document.getElementById('button2');
searchButton2.addEventListener('click', async function (e) {
    const response = await fetch("/clicked2", {
        method: "post",
        headers: { "Content-Type": "application/json" },
    });
});

let searchButton4 = document.getElementById('button4');
searchButton4.addEventListener('click', async function (e) {
    const response = await fetch("/clicked4", {
        method: "post",
        headers: { "Content-Type": "application/json" },
    });
});