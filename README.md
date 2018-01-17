# Web-Spim

A MIPS Assembly (bare mode) simulator
-Main use for this is in CSE 341 at The University at Buffalo

## Why some instructions are missing ##

This tool is intended to be used to quickly write and test small
methods used in building larger MIPS (bare mode) programs.

I've chosen not to implement things like jal (jumping and linking) or load/store
instructions because those things should be tested in a real environment, not JavaScript.

Multiplication and Division instructions are also missing because students were not
allowed to use those instructions.

### Implemented Instructions ###

Instruction | Sample | Description
----------- | ------ | -----------
add   | add $v0, $t0, $t1 | Adds two registers
addu  | addu $v0, $t0, $t1 | Adds two registers (without overflow)
addi  | addi $v0, $t0, 0x15 | Adds one register with a sign extended immediate
addiu | addiu $v0, $t0, 0x15 | Adds one register with a sign extended immediate (without overflow)
sub   | sub $v0, $t0, $t1 | Subtracts one register from another
abs   | abs $v0, $t0 | Absolute value of the register
and   | and $v0, $t0, $t1 | AND result of comparing two registers
andi  | addi $v0, $t0, 0x15 | AND result of comparing a register with an immediate
nor   | nor $v0, $t0, $t1 | NOR result comparing two registers
or    | or $v0, $t0, $t1 | OR result of comparing two registers
ori   | ori $v0, $t0, 0x15 | OR result of comparing a register with an immediate
xor   | xor $v0, $t0, $t1 | XOR result of comparing two registers
xori  | xori $v0, $t0, 0x15 | XOR result of comparing a register with an immediate
clo   | clo $v0, $t0 | Returns count of leading zeroes in a register
clz   | clz $v0, $t0 | Returns count of leading ones in a register
sll   | sll $v0, $t0, 3 | Shifts a register Left Logically by an immediate amount
sllv  | sllv $v0, $t0, $t1 | Shifts a register Left Logically by a register value amount
srl   | srl $v0, $t0, 3 | Shifts a register Right Logically by an immediate amount
srlv  | srlv $v0, $t0, $t1 | Shifts a register Right Logically by a register value amount
sra   | sra $v0, $t0, 3 | Shifts a register Right Arithmetically by an immediate amount
srav  | srav $v0, $t0, $t1 | Shifts a register Right Arithmetically by a register value amount
j     | j procedureName | Jumps to the linked procedure
beq   | beq $v0, $t0, procedureName | Branch on Equal to the linked procedure
beqz  | beqz $v0, procedureName | Branch to the linked procedure if register is equal to 0
bgtz  | bgtz $v0, procedureName | Branch to the linked procedure if register is greater than 0
bgez  | bgez $v0, procedureName | Branch to the linked procedure if register is greater or equal to 0
bltz  | bltz $v0, procedureName | Branch to the linked procedure if register is less than 0
blez  | blez $v0, procedureName | Branch to the linked procedure if register is less than or equal to 0
bne   | bne $v0, $t0, procedureName | Branch to the linked procedure if registers are not equal
lui   | lui $v0, 0x15 | Loads an immediate value into the upper 16-bits of a register
slt   | slt $v0, $t0, $t1 | Sets register to 1 if the first register is less than the second register
sltu  | sltu $v0, $t0, $t1 | Sets register to 1 if the first register is less than the second register (UNSIGNED)
slti  | slti $v0, $t0, 0x15 | Sets register to 1 if the first register is less than the immediate value
sltiu | sltiu $v0, $t0, 0x15 | Sets register to 1 if the first register is less than the immediate value (UNSIGNED)


