var shuffleSequence = seq(randomize("rating"), randomize("input"));
PennController.ResetPrefix(null);

// As before, we use FeedItems to define a template
// But now, we also specify that we want to use a subset of the table:
// this template only uses the rows where Label is 'rating'
PennController.FeedItems( PennController.defaultTable.filter("Label","rating") ,
    item => PennController(
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
);

// We use FeedItems a second time to define a template for the 'input' trials
// This template only uses the rows where Label is 'input'
PennController.FeedItems( PennController.defaultTable.filter("Label","input") ,
    item => PennController(
        newText("warning input", "Please enter some text before validating")
            .settings.bold()
            .settings.italic()
            .settings.color("red")
        ,
        newText("Instruction", "Please fill the box below to create a sentence that you find natural.")
            .settings.italic()
            .print()
        ,
        // item.Sentence will iteratively take the value of the column 'Sentence' for each row
        newTextInput("alternative")
            .settings.before( newText("before", item.Sentence) )
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
);
