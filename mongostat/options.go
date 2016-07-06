package mongostat

var Usage = `<options> <polling interval in seconds>

Monitor basic MongoDB server statistics.

See http://docs.mongodb.org/manual/reference/program/mongostat/ for more information.`

// StatOptions defines the set of options to use for configuring mongostat.
type StatOptions struct {
	Columns       string `short:"o" value-name:"<field>[,<field>]*" description:"fields to show. For custom fields, use dot-syntax to index into serverStatus output, and optional methods .diff() and .rate() e.g. metrics.record.moves.diff()"`
	AppendColumns string `short:"O" value-name:"<field>[,<field>]*" description:"like -o, but preloaded with default fields. Specified fields inserted after default output"`
	HumanReadable bool   `short:"h" long:"humanReadable" description:"print sizes in human readable format (e.g., 1K 234M 2G)"`
	NoHeaders     bool   `long:"noheaders" description:"don't output column names"`
	RowCount      int    `long:"rowcount" value-name:"<count>" short:"n" description:"number of stats lines to print (0 for indefinite)"`
	Discover      bool   `long:"discover" description:"discover nodes and display stats for all"`
	Http          bool   `long:"http" description:"use HTTP instead of raw db connection"`
	All           bool   `long:"all" description:"all optional fields"`
	Json          bool   `long:"json" description:"output as JSON rather than a formatted table"`
	Deprecated    bool   `long:"deprecated" description:"use old key names; only valid with the json output option."`
}

// Name returns a human-readable group name for mongostat options.
func (*StatOptions) Name() string {
	return "stat"
}
