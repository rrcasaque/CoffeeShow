import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class EditTest {
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
    @DisplayName("Edit Modal Tests")
    class EditModalTests {

        @Test
        @DisplayName("Should open edit modal after click on editar item button")
        void shouldOpenEditModalAfterClickOnEditarItemButton() {
            WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.id("update")));
            button.click();
            WebElement modal = driver.findElement(By.id("chakra-modal-:R1qpf6:"));
            assertThat(modal).isNotNull();
        }

        @Test
        @DisplayName("Should close edit modal after click on close button")
        void shouldCloseEditModalAfterClickOnFecharButton(){
            WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.id("update")));
            button.click();
            WebElement modal = driver.findElement(By.id("chakra-modal-:R1qpf6:"));
            WebElement primeiroBotao = modal.findElement(By.tagName("button"));
            primeiroBotao.click();
            assertThrows(NoSuchElementException.class, () -> {
                driver.findElement(By.id("chakra-modal-:R1qpf6:"));
            });
        }
        @Test
        @DisplayName("Should open edit item modal after click on editar item button and select item to edit")
        void shouldOpenEditItemModalAfterClickOnEditarItemButtonAndSelectItem() throws InterruptedException {
            WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.id("update")));
            Thread.sleep(2000);
            button.click();
            WebElement modal = driver.findElement(By.id("chakra-modal-:R1qpf6:"));
            modal.findElement(By.xpath("//td[p[text()='Editar']]")).click();
            WebElement itemModal = driver.findElement(By.id("chakra-modal-:r3:"));
            assertThat(itemModal).isNotNull();
        }

        @Test
        @DisplayName("Should show success toast after click on editar button inside item modal")
        void shouldShowSuccessToastAfterClickOnEditarButtonInsideItemModal() throws InterruptedException {
            Thread.sleep(2000);
            driver.findElement(By.id("update")).click();
            WebElement modal = driver.findElement(By.id("chakra-modal-:R1qpf6:"));
            driver.findElement(By.id("654a8d343d0dd8dbca7a6bf3")).click();
            WebElement itemModal = driver.findElement(By.id("chakra-modal-:r3:"));
            itemModal.findElement(By.className("chakra-button")).click();
            WebElement toast = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("toast-1-title")));
            assertThat(toast.getText()).isEqualTo("Item alterado com sucesso!");
        }
        @Test
        @DisplayName("Should edit text after click on edit button")
        void shouldEditTextAfterClickOnEditButton() throws InterruptedException {
            Faker faker = new Faker();
            String beer = faker.beer().name();
            Thread.sleep(3000);
            driver.findElement(By.id("update")).click();
            WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//td[5]//p")));
            button.click();
            WebElement itemModal = driver.findElement(By.id("chakra-modal-:r3:"));
            WebElement itemNameInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@id='chakra-modal--body-:r3:']//input[1]")));
            itemNameInput.clear();
            itemNameInput.sendKeys(beer);
            itemModal.findElement(By.className("chakra-button")).click();
            WebElement toast = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("toast-1-title")));
            assertThat(toast.getText()).isEqualTo("Item alterado com sucesso!");
        }
    }
}