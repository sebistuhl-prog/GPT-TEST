//
// Created by sebas on 14.01.2026.
//

// You may need to build the project (run Qt uic code generator) to get "ui_Calculator.h" resolved

#include "calculator.h"
#include "ui_Calculator.h"
#include <QString>
#include <QLineEdit>
using namespace std::complex_literals;

namespace {
std::complex<double> parseComplex(const QString &text)
{
    QString cleaned = text;
    cleaned.remove(' ');

    if (cleaned.isEmpty()) {
        return 0.0 + 0.0j;
    }

    if (!cleaned.contains('j')) {
        return cleaned.toDouble() + 0.0j;
    }

    if (cleaned == "j") {
        return 0.0 + 1.0j;
    }
    if (cleaned == "-j") {
        return 0.0 - 1.0j;
    }

    QString withoutJ = cleaned;
    withoutJ.chop(1);

    int splitIndex = -1;
    for (int i = 1; i < withoutJ.size(); ++i) {
        if (withoutJ[i] == '+' || withoutJ[i] == '-') {
            splitIndex = i;
        }
    }

    if (splitIndex == -1) {
        QString imagPartText = withoutJ;
        if (imagPartText == "+" || imagPartText.isEmpty()) {
            imagPartText = "1";
        } else if (imagPartText == "-") {
            imagPartText = "-1";
        }
        return 0.0 + std::complex<double>(0.0, imagPartText.toDouble());
    }

    const double realPart = withoutJ.left(splitIndex).toDouble();
    QString imagPartText = withoutJ.mid(splitIndex);
    if (imagPartText == "+") {
        imagPartText = "1";
    } else if (imagPartText == "-") {
        imagPartText = "-1";
    }

    return std::complex<double>(realPart, imagPartText.toDouble());
}

QString formatComplex(const std::complex<double> &value)
{
    const double real = value.real();
    const double imag = value.imag();

    if (imag == 0.0) {
        return QString::number(real);
    }

    if (real == 0.0) {
        return QString::number(imag) + "j";
    }

    const QString imagPrefix = imag < 0.0 ? "" : "+";
    return QString::number(real) + imagPrefix + QString::number(imag) + "j";
}

void appendDigit(QLineEdit *display, int digit)
{
    QString text = display->text();
    if (text == "0") {
        display->setText(QString::number(digit));
        return;
    }

    text += QString::number(digit);
    display->setText(text);
}
}


Calculator::Calculator(QWidget *parent) :
    QWidget(parent), ui(new Ui::Calculator)
{
    ui->setupUi(this);
    oper = None;
    numA = 0.0 + 0.0j;
    numB = 0.0 + 0.0j;
}

Calculator::~Calculator() {
    delete ui;
}

void Calculator::on_pushButton_0_clicked()
{
    appendDigit(ui->lcdNumber, 0);
}
void Calculator::on_pushButton_1_clicked()
{
    appendDigit(ui->lcdNumber, 1);
}
void Calculator::on_pushButton_2_clicked()
{
    appendDigit(ui->lcdNumber, 2);
}
void Calculator::on_pushButton_3_clicked()
{
    appendDigit(ui->lcdNumber, 3);
}
void Calculator::on_pushButton_4_clicked()
{
    appendDigit(ui->lcdNumber, 4);
}
void Calculator::on_pushButton_5_clicked()
{
    appendDigit(ui->lcdNumber, 5);
}
void Calculator::on_pushButton_6_clicked()
{
    appendDigit(ui->lcdNumber, 6);
}
void Calculator::on_pushButton_7_clicked()
{
    appendDigit(ui->lcdNumber, 7);
}
void Calculator::on_pushButton_8_clicked()
{
    appendDigit(ui->lcdNumber, 8);
}
void Calculator::on_pushButton_9_clicked()
{
    appendDigit(ui->lcdNumber, 9);
}
void Calculator::on_pushButton_del_clicked()
{
    QString text = ui->lcdNumber->text();
    if (text.isEmpty() || text == "0") {
        return;
    }
    text.chop(1);
    if (text.isEmpty()) {
        text = "0";
    }
    ui->lcdNumber->setText(text);
}
void Calculator::on_pushButton_res_clicked()
{
    numB = parseComplex(ui->lcdNumber->text());
    switch (oper)
    {
        case Add:
            ui->lcdNumber->setText(formatComplex(numA + numB));
        break;
        case Sub:
            ui->lcdNumber->setText(formatComplex(numA - numB));
        break;
        case Mul:
            ui->lcdNumber->setText(formatComplex(numA * numB));
        break;
        case Div:
            ui->lcdNumber->setText(formatComplex(numA / numB));
        break;
        default:


            break;

    }
}
void Calculator::on_pushButton_div_clicked()
{
    this->numA = parseComplex(ui->lcdNumber->text());
    ui->lcdNumber->setText(QString::number(0));
    oper = Div;
}
void Calculator::on_pushButton_mult_clicked()
{
    this->numA = parseComplex(ui->lcdNumber->text());
    ui->lcdNumber->setText(QString::number(0));
    oper = Mul;
}
void Calculator::on_pushButton_sum_clicked()
{
    this->numA = parseComplex(ui->lcdNumber->text());
    ui->lcdNumber->setText(QString::number(0));
    oper = Add;
}
void Calculator::on_pushButton_sub_clicked()
{
    this->numA = parseComplex(ui->lcdNumber->text());
    ui->lcdNumber->setText(QString::number(0));
    oper = Sub;
}

void Calculator::on_pushButton_cle_clicked()
{
    ui->lcdNumber->setText(QString::number(0));
    numA = 0.0 + 0.0j;
    numB = 0.0 + 0.0j;
    oper = None;
}

void Calculator::on_pushButton_div_2_clicked()
{
    QString text = ui->lcdNumber->text();
    if (!text.contains('j')) {
        if (text == "0") {
            text = "1j";
        } else {
            text += "j";
        }
        ui->lcdNumber->setText(text);
    }
}
