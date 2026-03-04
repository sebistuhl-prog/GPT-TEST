//
// Created by sebas on 14.01.2026.
//

#ifndef CALCULATOR_H
#define CALCULATOR_H
#include <complex>
#include <QWidget>


QT_BEGIN_NAMESPACE
namespace Ui { class Calculator; }
QT_END_NAMESPACE

class Calculator : public QWidget {
Q_OBJECT


public:
    explicit Calculator(QWidget *parent = nullptr);
    ~Calculator() override;
	
private:
    Ui::Calculator *ui;

    std::complex<double> numA, numB;

    enum operation {Add,Sub,Mul,Div,None }oper;

private slots:
        void on_pushButton_0_clicked();
        void on_pushButton_1_clicked();
        void on_pushButton_2_clicked();
        void on_pushButton_3_clicked();
        void on_pushButton_4_clicked();
        void on_pushButton_5_clicked();
        void on_pushButton_6_clicked();
        void on_pushButton_7_clicked();
        void on_pushButton_8_clicked();
        void on_pushButton_9_clicked();
        void on_pushButton_del_clicked();
        void on_pushButton_res_clicked();
        void on_pushButton_div_clicked();
        void on_pushButton_mult_clicked();
        void on_pushButton_sum_clicked();
        void on_pushButton_sub_clicked();
        void on_pushButton_cle_clicked();
        void on_pushButton_div_2_clicked();

};


#endif //CALCULATOR_H
