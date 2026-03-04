#pragma once

#include <QComboBox>
#include <QLabel>
#include <QLineEdit>
#include <QMainWindow>
#include <QPushButton>
#include <QTabWidget>
#include <QWidget>
#include <complex>

class ArgandWidget : public QWidget {
    Q_OBJECT
public:
    explicit ArgandWidget(QWidget* parent = nullptr);
    void setValues(const std::complex<double>& a,
                   const std::complex<double>& b,
                   const std::complex<double>& result);

protected:
    void paintEvent(QPaintEvent* event) override;

private:
    std::complex<double> m_a;
    std::complex<double> m_b;
    std::complex<double> m_result;
};

class TimeDomainWidget : public QWidget {
    Q_OBJECT
public:
    explicit TimeDomainWidget(QWidget* parent = nullptr);
    void setValues(const std::complex<double>& a,
                   const std::complex<double>& b,
                   const std::complex<double>& result);

protected:
    void paintEvent(QPaintEvent* event) override;

private:
    std::complex<double> m_a;
    std::complex<double> m_b;
    std::complex<double> m_result;
};

class MainWindow : public QMainWindow {
    Q_OBJECT

public:
    explicit MainWindow(QWidget* parent = nullptr);

private slots:
    void calculate();

private:
    std::complex<double> readComplex(QLineEdit* realEdit, QLineEdit* imagEdit, bool& ok) const;
    QString formatComplex(const std::complex<double>& value) const;

    QLineEdit* m_realA;
    QLineEdit* m_imagA;
    QLineEdit* m_realB;
    QLineEdit* m_imagB;
    QComboBox* m_operation;
    QLabel* m_resultLabel;
    QLabel* m_statusLabel;
    ArgandWidget* m_argandWidget;
    TimeDomainWidget* m_timeDomainWidget;
};
