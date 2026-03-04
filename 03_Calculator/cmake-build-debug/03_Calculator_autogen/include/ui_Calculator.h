/********************************************************************************
** Form generated from reading UI file 'Calculator.ui'
**
** Created by: Qt User Interface Compiler version 6.10.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_CALCULATOR_H
#define UI_CALCULATOR_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_Calculator
{
public:
    QGridLayout *gridLayout;
    QPushButton *pushButton_sum;
    QPushButton *pushButton_0;
    QPushButton *pushButton_sub;
    QPushButton *pushButton_9;
    QPushButton *pushButton_2;
    QPushButton *pushButton_6;
    QPushButton *pushButton_4;
    QPushButton *pushButton_res;
    QPushButton *pushButton_8;
    QPushButton *pushButton_sub_3;
    QPushButton *pushButton_del;
    QPushButton *pushButton_cle;
    QPushButton *pushButton_div_2;
    QPushButton *pushButton_mult;
    QPushButton *pushButton_1;
    QPushButton *pushButton_sub_2;
    QPushButton *pushButton_div;
    QPushButton *pushButton_7;
    QPushButton *pushButton_5;
    QPushButton *pushButton_3;
    QLineEdit *lcdNumber;

    void setupUi(QWidget *Calculator)
    {
        if (Calculator->objectName().isEmpty())
            Calculator->setObjectName("Calculator");
        Calculator->resize(775, 604);
        QSizePolicy sizePolicy(QSizePolicy::Policy::Maximum, QSizePolicy::Policy::Maximum);
        sizePolicy.setHorizontalStretch(0);
        sizePolicy.setVerticalStretch(0);
        sizePolicy.setHeightForWidth(Calculator->sizePolicy().hasHeightForWidth());
        Calculator->setSizePolicy(sizePolicy);
        Calculator->setToolTipDuration(10000);
        Calculator->setAutoFillBackground(false);
        gridLayout = new QGridLayout(Calculator);
        gridLayout->setObjectName("gridLayout");
        pushButton_sum = new QPushButton(Calculator);
        pushButton_sum->setObjectName("pushButton_sum");
        QSizePolicy sizePolicy1(QSizePolicy::Policy::Minimum, QSizePolicy::Policy::Preferred);
        sizePolicy1.setHorizontalStretch(0);
        sizePolicy1.setVerticalStretch(0);
        sizePolicy1.setHeightForWidth(pushButton_sum->sizePolicy().hasHeightForWidth());
        pushButton_sum->setSizePolicy(sizePolicy1);
        QFont font;
        font.setPointSize(26);
        pushButton_sum->setFont(font);
        pushButton_sum->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_sum, 1, 3, 1, 1);

        pushButton_0 = new QPushButton(Calculator);
        pushButton_0->setObjectName("pushButton_0");
        sizePolicy1.setHeightForWidth(pushButton_0->sizePolicy().hasHeightForWidth());
        pushButton_0->setSizePolicy(sizePolicy1);
        pushButton_0->setFont(font);
        pushButton_0->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_0, 5, 1, 1, 1);

        pushButton_sub = new QPushButton(Calculator);
        pushButton_sub->setObjectName("pushButton_sub");
        pushButton_sub->setEnabled(true);
        sizePolicy1.setHeightForWidth(pushButton_sub->sizePolicy().hasHeightForWidth());
        pushButton_sub->setSizePolicy(sizePolicy1);
        pushButton_sub->setMinimumSize(QSize(0, 0));
        pushButton_sub->setSizeIncrement(QSize(0, 0));
        pushButton_sub->setFont(font);
        pushButton_sub->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_sub, 3, 3, 1, 1);

        pushButton_9 = new QPushButton(Calculator);
        pushButton_9->setObjectName("pushButton_9");
        sizePolicy1.setHeightForWidth(pushButton_9->sizePolicy().hasHeightForWidth());
        pushButton_9->setSizePolicy(sizePolicy1);
        pushButton_9->setFont(font);
        pushButton_9->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_9, 4, 2, 1, 1);

        pushButton_2 = new QPushButton(Calculator);
        pushButton_2->setObjectName("pushButton_2");
        sizePolicy1.setHeightForWidth(pushButton_2->sizePolicy().hasHeightForWidth());
        pushButton_2->setSizePolicy(sizePolicy1);
        pushButton_2->setFont(font);
        pushButton_2->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_2, 1, 1, 1, 1);

        pushButton_6 = new QPushButton(Calculator);
        pushButton_6->setObjectName("pushButton_6");
        sizePolicy1.setHeightForWidth(pushButton_6->sizePolicy().hasHeightForWidth());
        pushButton_6->setSizePolicy(sizePolicy1);
        pushButton_6->setFont(font);
        pushButton_6->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_6, 3, 2, 1, 1);

        pushButton_4 = new QPushButton(Calculator);
        pushButton_4->setObjectName("pushButton_4");
        sizePolicy1.setHeightForWidth(pushButton_4->sizePolicy().hasHeightForWidth());
        pushButton_4->setSizePolicy(sizePolicy1);
        pushButton_4->setFont(font);
        pushButton_4->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_4, 3, 0, 1, 1);

        pushButton_res = new QPushButton(Calculator);
        pushButton_res->setObjectName("pushButton_res");
        sizePolicy1.setHeightForWidth(pushButton_res->sizePolicy().hasHeightForWidth());
        pushButton_res->setSizePolicy(sizePolicy1);
        pushButton_res->setFont(font);
        pushButton_res->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_res, 5, 2, 1, 1);

        pushButton_8 = new QPushButton(Calculator);
        pushButton_8->setObjectName("pushButton_8");
        sizePolicy1.setHeightForWidth(pushButton_8->sizePolicy().hasHeightForWidth());
        pushButton_8->setSizePolicy(sizePolicy1);
        pushButton_8->setFont(font);
        pushButton_8->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));
        pushButton_8->setAutoFillBackground(false);

        gridLayout->addWidget(pushButton_8, 4, 1, 1, 1);

        pushButton_sub_3 = new QPushButton(Calculator);
        pushButton_sub_3->setObjectName("pushButton_sub_3");
        pushButton_sub_3->setEnabled(true);
        sizePolicy1.setHeightForWidth(pushButton_sub_3->sizePolicy().hasHeightForWidth());
        pushButton_sub_3->setSizePolicy(sizePolicy1);
        pushButton_sub_3->setMinimumSize(QSize(0, 0));
        pushButton_sub_3->setSizeIncrement(QSize(0, 0));
        pushButton_sub_3->setFont(font);
        pushButton_sub_3->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_sub_3, 4, 4, 1, 1);

        pushButton_del = new QPushButton(Calculator);
        pushButton_del->setObjectName("pushButton_del");
        sizePolicy1.setHeightForWidth(pushButton_del->sizePolicy().hasHeightForWidth());
        pushButton_del->setSizePolicy(sizePolicy1);
        QFont font1;
        font1.setPointSize(20);
        pushButton_del->setFont(font1);
        pushButton_del->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_del, 5, 0, 1, 1);

        pushButton_cle = new QPushButton(Calculator);
        pushButton_cle->setObjectName("pushButton_cle");
        sizePolicy1.setHeightForWidth(pushButton_cle->sizePolicy().hasHeightForWidth());
        pushButton_cle->setSizePolicy(sizePolicy1);
        pushButton_cle->setFont(font);
        pushButton_cle->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_cle, 1, 4, 1, 1);

        pushButton_div_2 = new QPushButton(Calculator);
        pushButton_div_2->setObjectName("pushButton_div_2");
        sizePolicy1.setHeightForWidth(pushButton_div_2->sizePolicy().hasHeightForWidth());
        pushButton_div_2->setSizePolicy(sizePolicy1);
        pushButton_div_2->setFont(font);
        pushButton_div_2->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_div_2, 5, 4, 1, 1);

        pushButton_mult = new QPushButton(Calculator);
        pushButton_mult->setObjectName("pushButton_mult");
        sizePolicy1.setHeightForWidth(pushButton_mult->sizePolicy().hasHeightForWidth());
        pushButton_mult->setSizePolicy(sizePolicy1);
        pushButton_mult->setFont(font);
        pushButton_mult->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_mult, 4, 3, 1, 1);

        pushButton_1 = new QPushButton(Calculator);
        pushButton_1->setObjectName("pushButton_1");
        sizePolicy1.setHeightForWidth(pushButton_1->sizePolicy().hasHeightForWidth());
        pushButton_1->setSizePolicy(sizePolicy1);
        pushButton_1->setFont(font);
        pushButton_1->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_1, 1, 0, 1, 1);

        pushButton_sub_2 = new QPushButton(Calculator);
        pushButton_sub_2->setObjectName("pushButton_sub_2");
        pushButton_sub_2->setEnabled(true);
        sizePolicy1.setHeightForWidth(pushButton_sub_2->sizePolicy().hasHeightForWidth());
        pushButton_sub_2->setSizePolicy(sizePolicy1);
        pushButton_sub_2->setMinimumSize(QSize(0, 0));
        pushButton_sub_2->setSizeIncrement(QSize(0, 0));
        pushButton_sub_2->setFont(font);
        pushButton_sub_2->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_sub_2, 3, 4, 1, 1);

        pushButton_div = new QPushButton(Calculator);
        pushButton_div->setObjectName("pushButton_div");
        sizePolicy1.setHeightForWidth(pushButton_div->sizePolicy().hasHeightForWidth());
        pushButton_div->setSizePolicy(sizePolicy1);
        pushButton_div->setFont(font);
        pushButton_div->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_div, 5, 3, 1, 1);

        pushButton_7 = new QPushButton(Calculator);
        pushButton_7->setObjectName("pushButton_7");
        sizePolicy1.setHeightForWidth(pushButton_7->sizePolicy().hasHeightForWidth());
        pushButton_7->setSizePolicy(sizePolicy1);
        pushButton_7->setFont(font);
        pushButton_7->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_7, 4, 0, 1, 1);

        pushButton_5 = new QPushButton(Calculator);
        pushButton_5->setObjectName("pushButton_5");
        sizePolicy1.setHeightForWidth(pushButton_5->sizePolicy().hasHeightForWidth());
        pushButton_5->setSizePolicy(sizePolicy1);
        pushButton_5->setFont(font);
        pushButton_5->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_5, 3, 1, 1, 1);

        pushButton_3 = new QPushButton(Calculator);
        pushButton_3->setObjectName("pushButton_3");
        sizePolicy1.setHeightForWidth(pushButton_3->sizePolicy().hasHeightForWidth());
        pushButton_3->setSizePolicy(sizePolicy1);
        pushButton_3->setFont(font);
        pushButton_3->setCursor(QCursor(Qt::CursorShape::PointingHandCursor));

        gridLayout->addWidget(pushButton_3, 1, 2, 1, 1);

        lcdNumber = new QLineEdit(Calculator);
        lcdNumber->setObjectName("lcdNumber");
        QSizePolicy sizePolicy2(QSizePolicy::Policy::MinimumExpanding, QSizePolicy::Policy::Preferred);
        sizePolicy2.setHorizontalStretch(0);
        sizePolicy2.setVerticalStretch(0);
        sizePolicy2.setHeightForWidth(lcdNumber->sizePolicy().hasHeightForWidth());
        lcdNumber->setSizePolicy(sizePolicy2);
        lcdNumber->setMinimumSize(QSize(0, 0));
        QFont font2;
        font2.setPointSize(14);
        lcdNumber->setFont(font2);

        gridLayout->addWidget(lcdNumber, 0, 0, 1, 5);


        retranslateUi(Calculator);

        QMetaObject::connectSlotsByName(Calculator);
    } // setupUi

    void retranslateUi(QWidget *Calculator)
    {
        Calculator->setWindowTitle(QCoreApplication::translate("Calculator", "Ein Super Taschenrechner", nullptr));
#if QT_CONFIG(tooltip)
        Calculator->setToolTip(QString());
#endif // QT_CONFIG(tooltip)
#if QT_CONFIG(whatsthis)
        Calculator->setWhatsThis(QString());
#endif // QT_CONFIG(whatsthis)
        pushButton_sum->setText(QCoreApplication::translate("Calculator", "+", nullptr));
        pushButton_0->setText(QCoreApplication::translate("Calculator", "0", nullptr));
        pushButton_sub->setText(QCoreApplication::translate("Calculator", "-", nullptr));
        pushButton_9->setText(QCoreApplication::translate("Calculator", "9", nullptr));
        pushButton_2->setText(QCoreApplication::translate("Calculator", "2", nullptr));
        pushButton_6->setText(QCoreApplication::translate("Calculator", "6", nullptr));
        pushButton_4->setText(QCoreApplication::translate("Calculator", "4", nullptr));
        pushButton_res->setText(QCoreApplication::translate("Calculator", "=", nullptr));
        pushButton_8->setText(QCoreApplication::translate("Calculator", "8", nullptr));
        pushButton_sub_3->setText(QCoreApplication::translate("Calculator", "x\312\270", nullptr));
        pushButton_del->setText(QCoreApplication::translate("Calculator", "Delete", nullptr));
        pushButton_cle->setText(QCoreApplication::translate("Calculator", "C", nullptr));
        pushButton_div_2->setText(QCoreApplication::translate("Calculator", "j", nullptr));
        pushButton_mult->setText(QCoreApplication::translate("Calculator", "*", nullptr));
        pushButton_1->setText(QCoreApplication::translate("Calculator", "1", nullptr));
        pushButton_sub_2->setText(QCoreApplication::translate("Calculator", "\342\210\232", nullptr));
        pushButton_div->setText(QCoreApplication::translate("Calculator", "/", nullptr));
        pushButton_7->setText(QCoreApplication::translate("Calculator", "7", nullptr));
        pushButton_5->setText(QCoreApplication::translate("Calculator", "5", nullptr));
        pushButton_3->setText(QCoreApplication::translate("Calculator", "3", nullptr));
    } // retranslateUi

};

namespace Ui {
    class Calculator: public Ui_Calculator {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_CALCULATOR_H
