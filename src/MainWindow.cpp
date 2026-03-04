#include "MainWindow.h"

#include <QFormLayout>
#include <QFrame>
#include <QGridLayout>
#include <QGroupBox>
#include <QHBoxLayout>
#include <QPainter>
#include <QPainterPath>
#include <QPen>
#include <QVBoxLayout>
#include <cmath>

namespace {
void drawVector(QPainter& painter,
                const QPointF& center,
                const std::complex<double>& value,
                double scale,
                const QColor& color,
                const QString& label) {
    const QPointF end(center.x() + value.real() * scale,
                      center.y() - value.imag() * scale);

    painter.setPen(QPen(color, 2));
    painter.drawLine(center, end);
    painter.setBrush(color);
    painter.drawEllipse(end, 4, 4);
    painter.drawText(end + QPointF(6, -6), label);
}

void drawSignal(QPainter& painter,
                const QRectF& rect,
                const std::complex<double>& value,
                const QColor& color,
                const QString& label) {
    const double amplitude = std::abs(value);
    const double phase = std::arg(value);

    painter.setPen(QPen(color, 2));
    QPainterPath path;
    for (int x = 0; x <= static_cast<int>(rect.width()); ++x) {
        const double t = (x / rect.width()) * 2.0 * M_PI;
        const double ySignal = amplitude * std::sin(t + phase);
        const double y = rect.center().y() - ySignal * (rect.height() * 0.35 / 5.0);
        const QPointF point(rect.left() + x, y);
        if (x == 0) {
            path.moveTo(point);
        } else {
            path.lineTo(point);
        }
    }
    painter.drawPath(path);
    painter.drawText(rect.left() + 8, rect.top() + 18 + (label == "a" ? 0 : (label == "b" ? 18 : 36)),
                     QString("%1: A=%2, φ=%3 rad")
                         .arg(label)
                         .arg(QString::number(amplitude, 'f', 2))
                         .arg(QString::number(phase, 'f', 2)));
}
} // namespace

ArgandWidget::ArgandWidget(QWidget* parent)
    : QWidget(parent) {
    setMinimumHeight(220);
}

void ArgandWidget::setValues(const std::complex<double>& a,
                             const std::complex<double>& b,
                             const std::complex<double>& result) {
    m_a = a;
    m_b = b;
    m_result = result;
    update();
}

void ArgandWidget::paintEvent(QPaintEvent* event) {
    QWidget::paintEvent(event);

    QPainter painter(this);
    painter.setRenderHint(QPainter::Antialiasing, true);

    const QRectF area = rect().adjusted(12, 12, -12, -12);
    const QPointF center = area.center();

    painter.setPen(QPen(Qt::gray, 1));
    painter.drawRect(area);
    painter.drawLine(QPointF(area.left(), center.y()), QPointF(area.right(), center.y()));
    painter.drawLine(QPointF(center.x(), area.top()), QPointF(center.x(), area.bottom()));
    painter.drawText(area.left() + 4, area.top() + 14, "Im");
    painter.drawText(area.right() - 18, center.y() - 4, "Re");

    const double maxAbs = std::max({1.0,
                                    std::abs(m_a),
                                    std::abs(m_b),
                                    std::abs(m_result)});
    const double scale = (std::min(area.width(), area.height()) * 0.42) / maxAbs;

    drawVector(painter, center, m_a, scale, QColor("#1f77b4"), "a");
    drawVector(painter, center, m_b, scale, QColor("#2ca02c"), "b");
    drawVector(painter, center, m_result, scale, QColor("#d62728"), "r");
}

TimeDomainWidget::TimeDomainWidget(QWidget* parent)
    : QWidget(parent) {
    setMinimumHeight(220);
}

void TimeDomainWidget::setValues(const std::complex<double>& a,
                                 const std::complex<double>& b,
                                 const std::complex<double>& result) {
    m_a = a;
    m_b = b;
    m_result = result;
    update();
}

void TimeDomainWidget::paintEvent(QPaintEvent* event) {
    QWidget::paintEvent(event);

    QPainter painter(this);
    painter.setRenderHint(QPainter::Antialiasing, true);

    const QRectF area = rect().adjusted(12, 12, -12, -12);
    painter.setPen(QPen(Qt::gray, 1));
    painter.drawRect(area);
    painter.drawLine(QPointF(area.left(), area.center().y()), QPointF(area.right(), area.center().y()));

    drawSignal(painter, area, m_a, QColor("#1f77b4"), "a");
    drawSignal(painter, area, m_b, QColor("#2ca02c"), "b");
    drawSignal(painter, area, m_result, QColor("#d62728"), "r");
}

MainWindow::MainWindow(QWidget* parent)
    : QMainWindow(parent),
      m_realA(new QLineEdit(this)),
      m_imagA(new QLineEdit(this)),
      m_realB(new QLineEdit(this)),
      m_imagB(new QLineEdit(this)),
      m_operation(new QComboBox(this)),
      m_resultLabel(new QLabel("Ergebnis: 0 + 0i", this)),
      m_statusLabel(new QLabel(this)),
      m_argandWidget(new ArgandWidget(this)),
      m_timeDomainWidget(new TimeDomainWidget(this)) {
    auto* central = new QWidget(this);
    auto* mainLayout = new QVBoxLayout(central);

    auto* inputBox = new QGroupBox("Eingabe komplexer Zahlen", central);
    auto* inputLayout = new QGridLayout(inputBox);

    m_realA->setPlaceholderText("Re(a)");
    m_imagA->setPlaceholderText("Im(a)");
    m_realB->setPlaceholderText("Re(b)");
    m_imagB->setPlaceholderText("Im(b)");

    inputLayout->addWidget(new QLabel("a =", inputBox), 0, 0);
    inputLayout->addWidget(m_realA, 0, 1);
    inputLayout->addWidget(new QLabel("+", inputBox), 0, 2);
    inputLayout->addWidget(m_imagA, 0, 3);
    inputLayout->addWidget(new QLabel("i", inputBox), 0, 4);

    inputLayout->addWidget(new QLabel("b =", inputBox), 1, 0);
    inputLayout->addWidget(m_realB, 1, 1);
    inputLayout->addWidget(new QLabel("+", inputBox), 1, 2);
    inputLayout->addWidget(m_imagB, 1, 3);
    inputLayout->addWidget(new QLabel("i", inputBox), 1, 4);

    m_operation->addItems({"a + b", "a - b", "a * b", "a / b"});
    auto* calculateButton = new QPushButton("Berechnen", inputBox);
    connect(calculateButton, &QPushButton::clicked, this, &MainWindow::calculate);

    inputLayout->addWidget(new QLabel("Operation", inputBox), 2, 0);
    inputLayout->addWidget(m_operation, 2, 1, 1, 2);
    inputLayout->addWidget(calculateButton, 2, 3, 1, 2);

    auto* resultFrame = new QFrame(central);
    auto* resultLayout = new QVBoxLayout(resultFrame);
    m_resultLabel->setStyleSheet("font-weight: bold; font-size: 16px;");
    m_statusLabel->setStyleSheet("color: #b00020;");
    resultLayout->addWidget(m_resultLabel);
    resultLayout->addWidget(m_statusLabel);

    auto* tabs = new QTabWidget(central);
    tabs->addTab(m_argandWidget, "Zeigerdiagramm");
    tabs->addTab(m_timeDomainWidget, "Zeitbereich");

    mainLayout->addWidget(inputBox);
    mainLayout->addWidget(resultFrame);
    mainLayout->addWidget(tabs, 1);

    setCentralWidget(central);
    setWindowTitle("Komplexer Taschenrechner (Qt)");
    resize(900, 700);

    m_realA->setText("2");
    m_imagA->setText("1");
    m_realB->setText("3");
    m_imagB->setText("-2");
    calculate();
}

std::complex<double> MainWindow::readComplex(QLineEdit* realEdit, QLineEdit* imagEdit, bool& ok) const {
    bool okReal = false;
    bool okImag = false;
    const double real = realEdit->text().toDouble(&okReal);
    const double imag = imagEdit->text().toDouble(&okImag);
    ok = okReal && okImag;
    return {real, imag};
}

QString MainWindow::formatComplex(const std::complex<double>& value) const {
    const QString sign = value.imag() >= 0 ? "+" : "-";
    return QString("%1 %2 %3i")
        .arg(QString::number(value.real(), 'f', 4))
        .arg(sign)
        .arg(QString::number(std::abs(value.imag()), 'f', 4));
}

void MainWindow::calculate() {
    bool okA = false;
    bool okB = false;
    const auto a = readComplex(m_realA, m_imagA, okA);
    const auto b = readComplex(m_realB, m_imagB, okB);

    if (!okA || !okB) {
        m_statusLabel->setText("Bitte gültige Zahlen eingeben.");
        return;
    }

    std::complex<double> result;
    const auto op = m_operation->currentText();

    if (op == "a + b") {
        result = a + b;
    } else if (op == "a - b") {
        result = a - b;
    } else if (op == "a * b") {
        result = a * b;
    } else {
        if (std::abs(b) < 1e-12) {
            m_statusLabel->setText("Division durch 0 ist nicht definiert.");
            return;
        }
        result = a / b;
    }

    m_statusLabel->clear();
    m_resultLabel->setText(QString("Ergebnis: %1").arg(formatComplex(result)));
    m_argandWidget->setValues(a, b, result);
    m_timeDomainWidget->setValues(a, b, result);
}
