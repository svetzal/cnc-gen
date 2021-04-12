# cnc-gen

**USE AT YOUR OWN RISK**

Currently, this is (barely) capable of generating CNC surface milling tool paths for my Snapmaker A350.

It is a work in progress, you can play with it if you like, but at your own risk. My goal is for these tools to grow useful enough that I no longer have to boot some big program like Fusion 360 for utility operations like surfacing or finishing edges.

I have no other machines to test the generated code against, so use this at your own risk.

## Install for command-line tools

```bash
npm install -g cnc-gen
```

## Defaults

The default milling bit size for operations is 6.35mm or 1/4".

By default, the programs will output the CNC code to the console. If you want to write it to a file, be sure to use the `-o filename.cnc` option.

## Create Facing Program

Set your work origin to the center-point of the area you want to surface.

The following command will create a facing program that will mill a 100mm x 200mm area to a depth of 1mm.

```bash
cnc-gen-face -w 100 -l 200
```

If you want to write the program to a file, you can use this command.

```bash
cnc-gen-face -w 100 -l 200 -o face-100x200x1mm-6.35mm-fem.cnc
```

Always run a boundary check on the machine before starting any CNC program, to ensure your tool head stays clear of your clamps and is your stock is correctly sized and placed.

## Create Drilling Program

If you don't have a chuck to hold a regular drill-bit, you can use this program to bore holes in your stock.

End-mills cannot bore straight down, as they are designed to cut laterally. This program creates a CNC file that wll create the hole with a helical movement pattern, compatible with an end-mill bit.

Set your work origin to the center point for the hole you want to drill.

This command will generate CNC code to create a 4mm hole 10mm deep using a 3.175mm (1/8") end-mill.

```bash
cnc-gen-drill -t 3.175 -d 4 -z 10
```
