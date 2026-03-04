#include <QApplication>
#include <QPushButton>
#include "calculator.h"


int main(int argc, char *argv[])
{
	QApplication a(argc, argv);
	Calculator Calc;
	Calc.show();
	return QApplication::exec();
}