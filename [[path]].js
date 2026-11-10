<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Inventory · IT Master Tool</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/app.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>">
</head>
<body data-page="inventory">
<div class="wrap">
  <header class="top">
    <div>
      <h1>IT inventory</h1>
      <p>What the department has on hand, and where. <span class="who-am-i" id="whoami"></span></p>
    </div>
    <div class="top-alert-wrap"><button class="btn top-alert" id="topAlert" type="button" hidden><span aria-hidden="true">🔔</span> <span id="topAlertText"></span></button></div>
  </header>

  <nav class="tabs page-tabs" aria-label="Sections">
    <a href="/" id="navSched" class="ptab">Schedule</a>
    <a href="/timeoff/" id="navTimeoff" class="ptab">Time off</a>
    <a href="/projects/" id="navProj" class="ptab">Projects</a>
    <a href="/inventory/" id="navInv" class="ptab" aria-current="page">Inventory</a>
    <a href="/newhires/" id="navHire" class="ptab">New Hires</a>
  </nav>

  <div class="notice" id="notice" hidden></div>

  <section class="panel low-panel inv-main" aria-labelledby="lowH">
    <div class="panel-head"><h2 id="lowH">⚠ Low Inventory Items</h2>
        <div class="low-actions"><span class="ist low" id="lowCount"></span>
          <label class="low-all" id="lowAllWrap" hidden><input type="checkbox" id="lowAll"> Select all</label>
          <a class="btn primary" id="restockMail" role="button" aria-disabled="true">✉ Email Inventory Restock</a>
          <button class="btn" id="markOrdered" type="button" title="Add the checked items to Inventory On Order">📦 Mark as On Order</button></div></div>
      <div class="low-hint" id="lowHint" hidden>Check the items to restock, then select Email Inventory Restock.</div>
    <div class="low-list" id="lowList"></div>
  </section>

  <section class="panel inv-main" aria-labelledby="invH">
    <div class="panel-head">
      <h2 id="invH">Inventory</h2>
      <div class="filters">
        <input type="search" id="invSearch" class="inv-search" placeholder="Search items or notes…" aria-label="Search inventory">
      <select id="invCat" aria-label="Filter by item type"><option value="">All item types</option><option>Monitors</option><option>Keyboards</option><option>Mouse</option><option>PCs</option><option>Laptops</option><option>Tablets</option><option>iPad</option><option>iPhone</option><option>Printers</option><option>IP Phones</option><option>Conference Device</option><option>Web Cams</option><option>USB Headsets</option><option>IP Phone Headsets</option><option>Cables</option><option>Networking</option><option>Misc</option></select>
        <button class="btn" id="invCsv" type="button">Export CSV</button>
        <button class="btn" id="ordOpen" type="button">🚚 Inventory On Order</button>
        <button class="btn" id="histOpen" type="button">🕘 Inventory History</button>
        <button class="btn" id="metOpen" type="button">📊 Inventory Metrics</button>
        <button class="btn" id="soOpen" type="button">⇩ Sign Out Inventory</button>
        <button class="btn primary" id="invAdd" type="button">+ Add Inventory</button>
      </div>
    </div>
    <div class="inv-folders" id="invFolders" role="tablist" aria-label="Locations"></div>
    <div class="proj-stats" id="invStats" role="group" aria-label="Filter inventory"></div>
    <div class="scroll" id="invList"></div>
    <div class="foot-note">Quantities change through Sign Out Inventory, Mark received on orders, project completion, or Edit. When a count drops below its Minimum Level, the item is flagged and listed under Low Inventory Items.</div>
  </section>

  <div id="invOrders" hidden>
  <section class="panel" id="ordPanel" aria-labelledby="ordH">
    <div class="panel-head">
      <h2 id="ordH">🚚 Inventory On Order</h2>
      <div class="filters">
        <input type="search" id="ordSearch" class="inv-search" placeholder="Search items, vendor, order #…" aria-label="Search orders">
        <button class="btn" id="ordCsv" type="button">Export CSV</button>
        <button class="btn primary" id="ordAdd" type="button">+ Add Order</button>
        <button class="btn" id="ordBack" type="button">← Back to Inventory</button>
      </div>
    </div>
    <div class="proj-stats" id="ordStats" role="group" aria-label="Filter orders"></div>
    <div class="scroll" id="ordList"></div>
    <div class="foot-note">When an order arrives, select Mark received. Its quantity is added to that item’s count on the Inventory tab automatically.</div>
  </section>
  </div>

  <div id="invHistory" hidden>
  <section class="panel" aria-labelledby="soH">
    <div class="panel-head">
      <h2 id="soH">🕘 Inventory History</h2>
      <div class="filters">
        <button class="btn" id="histCsv" type="button">Export CSV</button>
        <button class="btn" id="histBack" type="button">← Back to Inventory</button>
      </div>
    </div>
    <div class="met-controls">
      <label>Search<input type="search" id="hSearch" placeholder="Item, person, notes…" autocomplete="off"></label>
      <label>Show<select id="hKind"><option value="">Everything</option><option value="out">Signed out</option><option value="in">Received / added</option></select></label>
      <label>Coming from<select id="hFrom"></select></label>
      <label>Going to<select id="hTo"></select></label>
      <label>Department<select id="hDept"></select></label>
      <label>From date<input type="date" id="hStart"></label>
      <label>To date<input type="date" id="hEnd"></label>
    </div>
    <div class="proj-stats met-cards" id="hCards"></div>
    <div class="scroll" id="soList"></div>
    <div class="foot-note" id="soNote"></div>
  </section>
  </div>
  <div id="invMetrics" hidden>
  <section class="panel" aria-labelledby="metH">
    <div class="panel-head">
      <h2 id="metH">📊 Inventory Metrics</h2>
      <div class="filters">
        <button class="btn" id="metCsv" type="button">Export CSV</button>
        <button class="btn" id="metBack" type="button">← Back to Inventory</button>
      </div>
    </div>
    <div class="met-controls">
      <label>Year<select id="metYear"></select></label>
      <label>Show by<select id="metPeriod"><option value="month">Month</option><option value="year">Year</option></select></label>
<label id="metMonthWrap">Month<select id="metMonth"></select></label>
      <label>Store<select id="metStore"></select></label>
      <label>Department<select id="metDept"></select></label>
      <label>Item type<select id="metCat"></select></label>
      <label>Break down by<select id="metGroup"><option value="store">Store</option><option value="dept">Department</option><option value="cat">Item type</option><option value="item">Item</option></select></label>
      <label>Measure<select id="metMeasure"><option value="value">$ amount</option><option value="qty">Number of items</option></select></label>
      <div class="seg met-view" role="radiogroup" aria-label="Display"><label><input type="radio" name="metView" value="table" checked> Table</label><label><input type="radio" name="metView" value="graph"> Graph</label></div>
    </div>
    <div class="proj-stats met-cards" id="metCards"></div>
    <div id="metBody"></div>
    <div class="foot-note">Based on Sign Out Inventory. Dollar amounts use the item’s cost when it was signed out (or its current cost for older sign-outs). Store is where the items went.</div>
  </section>
  <section class="panel" aria-labelledby="metItemsH">
    <div class="panel-head"><h2 id="metItemsH">What was signed out</h2><span class="emp-role" id="metItemsNote"></span></div>
    <div class="scroll" id="metItems"></div>
  </section>
  </div>
</div>

<dialog id="soDlg">
  <form method="dialog" id="soForm">
    <h3>Sign Out Inventory</h3>
    <div class="field"><label for="soItem">Item</label><select id="soItem"></select></div>
    <div class="row2">
      <div class="field"><label for="soQty">Quantity</label><input id="soQty" type="number" min="1" max="99999" step="1" value="1" required><small id="soAvail"></small></div>
      <div class="field"><label for="soWho">Signed out by</label><select id="soWho"></select></div>
    </div>
    <div class="field"><label for="soPin">PIN for the person signing it out</label><input id="soPin" type="password" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="••••" style="max-width:160px"><small>Their 4-digit PIN confirms it’s really them.</small></div>
    <div class="row2">
      <div class="field"><label for="soTo">Going to</label><select id="soTo"><option value="">Not set</option><option>Lester Glenn Mazda of Toms River</option><option>Lester Glenn Hyundai of Toms River</option><option>Lester Glenn Chevy of Toms River</option><option>Lester Glenn GMC of Toms River</option><option>Lester Glenn Subaru of Toms River</option><option>Lester Glenn Collision of Toms River</option><option>Lester Glenn Chrysler of Toms River</option><option>Lester Glenn Honda of Sea Girt</option><option>Lester Glenn Ford of Ocean</option><option>Lester Glenn Chevy of Freehold</option><option>Lester Glenn Chevy of Old Bridge</option><option>Lester Glenn Corporate of Toms River</option><option>Lester Glenn Warranty of Toms River</option><option>Lester Glenn Service BDC of Toms River</option><option>Lester Glenn Marketing</option><option>Lester Glenn Used Car Dept</option><option>Remote</option><option>Other location</option></select></div>
      <div class="field"><label for="soProj">For project (optional)</label><select id="soProj"></select></div>
    </div>
    <div class="field"><label for="soDept">Department</label><select id="soDept"><option value="">Choose department…</option><option>Finance</option><option>Sales</option><option>Sales BDC</option><option>Service</option><option>Service BDC</option><option>Marketing</option><option>IT Dept</option><option>Corporate</option><option>Warranty</option><option>Shop</option><option>Parts</option></select></div>
    <div class="field"><label for="soNotes">Notes (optional)</label><input id="soNotes" maxlength="200" autocomplete="off" placeholder="e.g. Replacing the monitor in the F&amp;I office"></div>
    <div class="err" id="soErr"></div>
    <div class="dlg-actions"><div class="right">
      <button class="btn ghost" value="cancel" type="button">Cancel</button>
      <button class="btn primary" value="save">⇩ Sign out</button>
    </div></div>
  </form>
</dialog>

<dialog id="ordDlg">
  <form method="dialog" id="ordForm">
    <h3 id="ordTitle">Add Order</h3>
    <div class="field"><label for="oItem">Inventory item</label><select id="oItem"></select></div>
    <div class="field" id="oNameField" hidden><label for="oName">Item name</label><input id="oName" maxlength="120" autocomplete="off" placeholder="Item that isn’t in inventory yet"></div>
    <div class="row2">
      <div class="field"><label for="oQty">Quantity ordered</label><input id="oQty" type="number" min="1" max="99999" step="1" value="1" required></div>
      <div class="field"><label for="oCost">Cost each ($)</label><input id="oCost" type="number" min="0" max="1000000" step="0.01" inputmode="decimal" placeholder="0.00"></div>
    </div>
    <div class="row2">
      <div class="field"><label for="oVendor">Vendor</label><input id="oVendor" maxlength="80" autocomplete="off" value="Amazon"></div>
      <div class="field"><label for="oStatus">Status</label><select id="oStatus"><option>Ordered</option><option>Shipped</option><option>Received</option><option>Cancelled</option></select></div>
    </div>
    <div class="row2">
      <div class="field"><label for="oDate">Order date</label><input id="oDate" type="date" required></div>
      <div class="field"><label for="oEta">Expected delivery</label><input id="oEta" type="date"></div>
    </div>
    <div class="field"><label for="oNum">Order # or tracking # (optional)</label><input id="oNum" maxlength="120" autocomplete="off"></div>
    <div class="field"><label for="oNotes">Notes (optional)</label><textarea id="oNotes" rows="2" maxlength="500"></textarea></div>
    <div class="err" id="ordErr"></div>
    <div class="dlg-actions">
      <button class="btn danger" id="ordDel" type="button" hidden>Delete order</button>
      <div class="right">
        <button class="btn ghost" value="cancel" type="button">Cancel</button>
        <button class="btn primary" value="save">Save order</button>
      </div>
    </div>
  </form>
</dialog>

<dialog id="invDlg">
  <form method="dialog" id="invForm">
    <h3 id="invTitle">Add Inventory</h3>
    <div class="seg" id="invModeWrap" role="radiogroup" aria-label="What are you adding?">
      <label><input type="radio" name="imode" value="new" checked> New item</label>
      <label><input type="radio" name="imode" value="more"> More of an item already in inventory</label>
    </div>
    <div id="invMoreFields" hidden>
      <div class="field"><label for="mItem">Item</label><select id="mItem"></select></div>
      <div class="row2">
        <div class="field"><label for="mQty">Quantity received</label><input id="mQty" type="number" min="1" max="99999" step="1" value="1"><small id="mAfter" class="so-after"></small></div>
        <div class="field"><label for="mCost">Item Cost ($)</label><input id="mCost" type="number" min="0" max="1000000" step="0.01" inputmode="decimal" placeholder="Keep current"><small>Leave blank to keep the current cost.</small></div>
      </div>
      <div class="field"><label for="mNotes">Notes (optional)</label><input id="mNotes" maxlength="200" autocomplete="off" placeholder="e.g. Amazon order 113-4567890"></div>
    </div>
    <div id="invNewFields">
    <div class="inv-img-field">
      <div class="inv-img-preview" id="iImgPrev" aria-hidden="true"><span>No image</span></div>
      <div>
        <label class="btn small" for="iImg">Choose image</label>
        <input id="iImg" type="file" accept="image/*" class="vh">
        <button class="btn small ghost" id="iImgClear" type="button" hidden>Remove image</button>
        <small class="emp-role" style="display:block;margin-top:4px">A photo of the item (JPG or PNG). It’s resized automatically.</small>
      </div>
    </div>
    <div class="field"><label for="iName">Item Name</label><input id="iName" maxlength="120" autocomplete="off" required placeholder="e.g. Dell 24&quot; monitor, HP 58A toner"></div>
    <div class="warn" id="iDup" hidden></div>
    <div class="field"><label for="iCat">Item type</label><select id="iCat"><option>Monitors</option><option>Keyboards</option><option>Mouse</option><option>PCs</option><option>Laptops</option><option>Tablets</option><option>iPad</option><option>iPhone</option><option>Printers</option><option>IP Phones</option><option>Conference Device</option><option>Web Cams</option><option>USB Headsets</option><option>IP Phone Headsets</option><option>Cables</option><option>Networking</option><option>Misc</option></select></div>
    <div class="row2">
      <div class="field"><label for="iCost">Item Cost ($)</label><input id="iCost" type="number" min="0" max="1000000" step="0.01" inputmode="decimal" placeholder="0.00"></div>
      <div class="field"><label for="iLoc">Location Stored At</label><select id="iLoc"><option value="">Not set</option><option>Lester Glenn Mazda of Toms River</option><option>Lester Glenn Hyundai of Toms River</option><option>Lester Glenn Chevy of Toms River</option><option>Lester Glenn GMC of Toms River</option><option>Lester Glenn Subaru of Toms River</option><option>Lester Glenn Collision of Toms River</option><option>Lester Glenn Chrysler of Toms River</option><option>Lester Glenn Honda of Sea Girt</option><option>Lester Glenn Ford of Ocean</option><option>Lester Glenn Chevy of Freehold</option><option>Lester Glenn Chevy of Old Bridge</option><option>Lester Glenn Corporate of Toms River</option><option>Lester Glenn Warranty of Toms River</option><option>Lester Glenn Service BDC of Toms River</option><option>Lester Glenn Marketing</option><option>Lester Glenn Used Car Dept</option><option>Other location</option></select></div>
    </div>
    <div class="row2">
      <div class="field"><label for="iQty">Quantity</label><input id="iQty" type="number" min="0" max="99999" step="1" value="1" required></div>
      <div class="field"><label for="iMin">Minimum Level</label><input id="iMin" type="number" min="0" max="99999" step="1" placeholder="e.g. 3"><small>Alert when the quantity drops below this.</small></div>
    </div>
    <div class="field"><label for="iNotes">Notes (optional)</label><textarea id="iNotes" rows="2" maxlength="500" placeholder="Shelf, vendor, model number…"></textarea></div>
    </div>
    <div id="invWhoField" class="row2"><div class="field"><label for="mWho">Added by</label><select id="mWho"></select></div><div class="field"><label for="mPin">Their 4-digit PIN</label><input id="mPin" type="password" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="••••"><small>Confirms it’s really them.</small></div></div>
    <div class="err" id="invErr"></div>
    <div class="dlg-actions">
      <button class="btn danger" id="invDel" type="button" hidden>Delete item</button>
      <div class="right">
        <button class="btn ghost" value="cancel" type="button">Cancel</button>
        <button class="btn primary" id="invSave" value="save">Save</button>
      </div>
    </div>
  </form>
</dialog>

<div class="toast" id="toast" role="status"></div>
<script src="/app.js"></script>
</body>
</html>
