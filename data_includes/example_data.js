var shuffleSequence = seq(randomize("rating"), randomize("input"));
PennController.ResetPrefix(null);

PennController.FeedItems( PennController.GetTable("ratings.csv") ,
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
);

PennController.FeedItems( PennController.GetTable("inputs.csv") ,
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
        newTextInput("alternative")
            .settings.log() // We want to collect data here
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
