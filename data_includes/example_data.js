// First thing: setcounter
var shuffleSequence = seq("setcounter", randomize("rating"), randomize("input"));
PennController.ResetPrefix(null);

var items = [

    // The counter is incremented when this is executed
    ["setcounter", "__SetCounter__", { }]
    
];

PennController.FeedItems( PennController.GetTable("design.csv").filter("Label","rating") ,
    (item) => PennController(
        newText("A's line", item.A)
            .print()
        ,
        newText("B's line", item.B)
            .print()
        ,
        newText("question", "How natural do you find B's answer?")
            .settings.italic()
            .settings.center()
            .print()
        ,
        newScale("answer",    "Unnatural", "So-so...", "Natural")
            .settings.log() // We want to collect data here
            .settings.radio()
            .settings.labels("bottom")
            .settings.center()
            .print()
            .wait()
        ,
        newButton("validate score", "Click here to validate")
            .settings.center()
            .print()
            .wait()
    )
    // We save ID, Label, Item and Group
        .logAppend( "ID" , PennController.GetURLParameter("id") )
        .logAppend( "Label" , item.Label )
        .logAppend( "Item"  , item.Item  )
        .logAppend( "Group" , item.Group )
);

PennController.FeedItems( PennController.GetTable("design.csv").filter("Label","input") ,
        (item) => PennController(
        newText("warning input", "Please enter some text before validating")
            .settings.bold()
            .settings.italic()
            .settings.color("red")
        ,
        newText("Instruction", "Please fill the box below to create a sentence that you find natural.")
            .settings.italic()
            .print()
        ,
        newTextInput("alternative")
            .settings.log() // We want to collect data here
            .settings.before(item.Sentence+" ") // Just adding a space character
            .print()
        ,
        newButton("validate input", "Click here to validate")
            .settings.center()
            .print()
            .wait(
                getTextInput("alternative")
                    .testNot.text("")
                    .failure( getText("warning input").print() )
            )
    )
    // Note that 'logAppend' relates to 'PennController' above (to the right of '=>')
        .logAppend( "ID" , PennController.GetURLParameter("id") )
        .logAppend( "Label" , item.Label )
        .logAppend( "Item"  , item.Item  )
        .logAppend( "Group" , item.Group )
);