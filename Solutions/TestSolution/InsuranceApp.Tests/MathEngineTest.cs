namespace InsuranceApp.Tests;
using Xunit;
using InsuranceApp;

public class MathEngineTest
{


    //Unit Test

    [Theory]
    [InlineData(10, 20, 30)]
    [InlineData(56, 65, 121)]
    [InlineData(100, 50, 150)]
    [InlineData(10, -5, 5)]
    [InlineData(-10, -20, -30)]
    [InlineData(0, 10, 10)]
    [InlineData(0, 0, 0)]
    public void Addition_ShouldReturnExpectedResult(
        int a,
        int b,
        int expected)
    {
        // Arrange
        MathEngine math = new MathEngine();

        // Act
        int actual = math.Addition(a, b);

        // Assert
        Assert.Equal(expected, actual);
    }

}
