//
// Created by sebas on 14.01.2026.
//

// You may need to build the project (run Qt uic code generator) to get "ui_Calculator.h" resolved

#include "calculator.h"
#include "ui_Calculator.h"
#include "complex.h"
using namespace std::complex_literals;


Calculator::Calculator(QWidget *parent) :
    QWidget(parent), ui(new Ui::Calculator)
{
    ui->setupUi(this);
}

Calculator::~Calculator() {
    delete ui;
}

void Calculator::on_pushButton_0_clicked()
{
    int number;
    number = ui->lcdNumber->text().toInt();
    number = number * 10;
    ui->lcdNumber->setText(QString::number(number));
}
void Calculator::on_pushButton_1_clicked()
{
    int number;
    number = ui->lcdNumber->text().toInt();
    number = number * 10 + 1;
    ui->lcdNumber->setText(QString::number(number));
}
void Calculator::on_pushButton_2_clicked()
{
    int number;
    number = ui->lcdNumber->text().toInt();
    number = number * 10 + 2;
    ui->lcdNumber->setText(QString::number(number));
}
void Calculator::on_pushButton_3_clicked()
{
    int number;
    number = ui->lcdNumber->text().toInt();
    number = number * 10 + 3;
    ui->lcdNumber->setText(QString::number(number));
}
void Calculator::on_pushButton_4_clicked()
{
    int number;
    number = ui->lcdNumber->text().toInt();
    number = number * 10 + 4;
    ui->lcdNumber->setText(QString::number(number));
}
void Calculator::on_pushButton_5_clicked()
{
    int number;
    number = ui->lcdNumber->text().toInt();
    number = number * 10 + 5;
    ui->lcdNumber->setText(QString::number(number));
}
void Calculator::on_pushButton_6_clicked()
{
    int number;
    number = ui->lcdNumber->text().toInt();
    number = number * 10 + 6;
    ui->lcdNumber->setText(QString::number(number));
}
void Calculator::on_pushButton_7_clicked()
{
    int number;
    number = ui->lcdNumber->text().toInt();
    number = number * 10 + 7;
    ui->lcdNumber->setText(QString::number(number));
}
void Calculator::on_pushButton_8_clicked()
{
    int number;
    number = ui->lcdNumber->text().toInt();
    number = number * 10 + 8;
    ui->lcdNumber->setText(QString::number(number));
}
void Calculator::on_pushButton_9_clicked()
{
    int number;
    number = ui->lcdNumber->text().toInt();
    number = number * 10 + 9;
    ui->lcdNumber->setText(QString::number(number));
}
void Calculator::on_pushButton_del_clicked()
{
    int number = ui->lcdNumber->text().toInt();
    number = number / 10;
    ui->lcdNumber->setText(QString::number(number));
}
void Calculator::on_pushButton_res_clicked()
{
    numB = ui->lcdNumber->text().toInt();
    switch (oper)
    {
        case Add:
            ui->lcdNumber->setText(QString::number(numA + numB));
        break;
        case Sub:
            ui->lcdNumber->setText(QString::number(numA - numB));
        break;
        case Mul:
            ui->lcdNumber->setText(QString::number(numA * numB));
        break;
        case Div:
            ui->lcdNumber->setText(QString::number(numA / numB));
        break;
        default:


            break;

    }
}
void Calculator::on_pushButton_div_clicked()
{
    this->numA = ui->lcdNumber->text().toInt();
    ui->lcdNumber->setText(QString::number(0));
    oper = Div;
}
void Calculator::on_pushButton_mult_clicked()
{
    this->numA = ui->lcdNumber->text().toInt();
    ui->lcdNumber->setText(QString::number(0));
    oper = Mul;
}
void Calculator::on_pushButton_sum_clicked()
{
    this->numA = ui->lcdNumber->text().toInt();
    ui->lcdNumber->setText(QString::number(0));
    oper = Add;
}
void Calculator::on_pushButton_sub_clicked()
{
    this->numA = ui->lcdNumber->text().toInt();
    ui->lcdNumber->setText(QString::number(0));
    oper = Sub;
}

void Calculator::on_pushButton_cle_clicked()
{
    ui->lcdNumber->setText(QString::number(0));
    numA = 0;
    numB = 0;
    oper = None;
}