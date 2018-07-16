db.getSisterDB("test")
var a = db.videoc.find({}, {_id: 0, category: 1, title_origin: 1, title: 1})
var phim_title = new Map()
for (var i = 0; i < a.count(); i++) { for (var j = 0; j < a[i].category.length; j++) { if (a[i].category[j].search("Phim") != -1 ) { phim_title.put(a[i].title, [a[i].category[j], a[i].title_origin]); } } }
for (var i in phim_title._data) { print(i + "\t" + phim_title._data[i][0].value[0] + "\t" + phim_title._data[i][0].value[1]); }