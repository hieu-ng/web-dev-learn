//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB")

const itemSchema = {
  name: String,
}

const Item = mongoose.model("item", itemSchema)

const listSchema = {
  name: String,
  items: [itemSchema]
}

const List = mongoose.model("List", listSchema)

const item1 = new Item({
  name: "Work"
})

const item2 = new Item({
  name: "Play"
})

const item3 = new Item({
  name: "Sleep"
})

const defaultItems = [item1, item2, item3]

app.get("/", function (req, res) {
  Item.find({}, (err, results) => {
    if (err) console.log(err)
    else {
      if (results.length == 0) {
        Item.insertMany(defaultItems)
        res.redirect("/")
      } else {
        res.render("list", { listTitle: "Today", newListItems: results });
      }

    }
  })


});

app.post("/", function (req, res) {
  console.log("req", req.body)
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName
  })

  if (listName === "Today") {
    Item.create({ name: item }, (err, result) => {
      item.save()
      res.redirect("/");
      console.log(`task ${itemName} is added`)
    })
  } else {
    List.findOne({ name: listName }, (err, itemList) => {
      if (!err) {
        if (itemList) {
          itemList.items.push(item)
          itemList.save()
          res.redirect(`/${listName}`);
        }
      }
    })
  }


});

app.post("/delete", (req, res) => {
  var itemId = req.body.itemToDel
  var listName = req.body.listName
  if (listName == "Today") {
    Item.deleteOne({ _id: itemId }, (err, res) => {
      console.log(`deleted: ${res}`)
    })
    res.redirect("/");
  } else {
    // List.findOne({ name: listName }, (err, itemList) => {
    //   if (!err) {
    //     itemList.items = itemList.items.filter(item => item._id != itemId)
    //     console.log("itemList", itemList)
    //     itemList.save()
    //     res.redirect(`/${listName}`);
    //   }
    // })

    List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: itemId } } }, (err, itemList) => {
      if (!err) {
        // itemList.items = itemList.items.filter(item => item._id != itemId)
        // console.log("itemList", itemList)
        // itemList.save()
        res.redirect(`/${listName}`);
      }
    })
  }
})
app.get("/:customListName", (req, res) => {
  var customListName = _.capitalize(req.params.customListName);
  console.log("customListName", customListName)
  List.findOne({ name: customListName }, (err, itemList) => {
    if (!err) {
      if (!itemList) {
        const list = new List({
          name: customListName,
          items: defaultItems
        })
        list.save()
        console.log("new list created", customListName)
        res.redirect(`/${customListName}`);
      }
      else {
        res.render("list", { listTitle: itemList.name, newListItems: itemList.items });
      }
    }
  })

})

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
