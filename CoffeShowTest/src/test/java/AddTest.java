
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;

class AddTest {
    WebDriver driver;
    WebDriverWait wait;

    @BeforeEach
    void setUp() {
        driver = new FirefoxDriver();
        WebDriverManager.firefoxdriver().setup();
        driver.get("https://coffee-show.vercel.app/");
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }


    @Nested
    @DisplayName("Tests for Register Modal")
    class RegisterModalTests {

        @Test
        @DisplayName("Should open register modal after click on adicionar item button")
        void shouldOpenRegisterModalAfterClickOnAdicionarItemButton() {
            WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.id("create")));
            button.click();
            WebElement modal = driver.findElement(By.id("chakra-modal-:R1qpf6:"));
            assertThat(modal).isNotNull();
        }
    }
}
